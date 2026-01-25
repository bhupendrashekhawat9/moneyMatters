import { Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Transaction from '../models/Transaction';
import Budget from '../models/Budget';
import Profile from '../models/Profile';
import { AuthRequest, IProfile } from '../types';

// @desc    Get monthly summary
// @route   GET /api/insights/monthly?profileId=&month=&year=
// @access  Private
export const getMonthlySummary = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { profileId, month, year } = req.query;

    // Verify profile belongs to user
    const profile = await Profile.findOne({
      _id: profileId,
      userId: req.user?._id,
    });

    if (!profile) {
      res.status(404);
      throw new Error('Profile not found');
    }

    const monthNum = parseInt(month as string);
    const yearNum = parseInt(year as string);
    const startDate = new Date(yearNum, monthNum - 1, profile.monthStartDay || 1);
    const endDate = new Date(yearNum, monthNum, profile.monthStartDay || 1);

    const result = await Transaction.aggregate([
      {
        $match: {
          profileId: new mongoose.Types.ObjectId(profileId as string),
          date: { $gte: startDate, $lt: endDate },
        },
      },
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
    ]);

    const income = result.find((r) => r._id === 'income')?.total || 0;
    const expense = result.find((r) => r._id === 'expense')?.total || 0;
    const savings = income - expense;

    res.json({
      period: { startDate, endDate },
      income,
      expense,
      savings,
      savingsRate: income > 0 ? Math.round((savings / income) * 100 * 100) / 100 : 0,
      transactionCount: result.reduce((sum, r) => sum + r.count, 0),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get category distribution
// @route   GET /api/insights/categories?profileId=&month=&year=
// @access  Private
export const getCategoryDistribution = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { profileId, month, year, type = 'expense' } = req.query;

    // Verify profile belongs to user
    const profile = await Profile.findOne({
      _id: profileId,
      userId: req.user?._id,
    });

    if (!profile) {
      res.status(404);
      throw new Error('Profile not found');
    }

    const monthNum = parseInt(month as string);
    const yearNum = parseInt(year as string);
    const startDate = new Date(yearNum, monthNum - 1, profile.monthStartDay || 1);
    const endDate = new Date(yearNum, monthNum, profile.monthStartDay || 1);

    const result = await Transaction.aggregate([
      {
        $match: {
          profileId: new mongoose.Types.ObjectId(profileId as string),
          type: type as string,
          date: { $gte: startDate, $lt: endDate },
        },
      },
      {
        $group: {
          _id: '$categoryId',
          total: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $unwind: '$category',
      },
      {
        $project: {
          categoryId: '$_id',
          categoryName: '$category.name',
          categoryIcon: '$category.icon',
          total: 1,
          count: 1,
        },
      },
      {
        $sort: { total: -1 },
      },
    ]);

    const grandTotal = result.reduce((sum, r) => sum + r.total, 0);

    const distribution = result.map((r) => ({
      ...r,
      percentage: grandTotal > 0 ? Math.round((r.total / grandTotal) * 100 * 100) / 100 : 0,
    }));

    res.json({
      period: { startDate, endDate },
      type,
      grandTotal,
      distribution,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get budget health
// @route   GET /api/insights/budget-health?budgetId=
// @access  Private
export const getBudgetHealth = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { budgetId } = req.query;

    const budget = await Budget.findById(budgetId).populate('profileId');

    if (!budget) {
      res.status(404);
      throw new Error('Budget not found');
    }

    // Verify profile belongs to user
    const profile = budget.profileId as IProfile;
    if (profile.userId.toString() !== req.user?._id.toString()) {
      res.status(403);
      throw new Error('Not authorized');
    }

    // Calculate spent
    const filter: Record<string, any> = {
      profileId: profile._id,
      type: 'expense',
      date: { $gte: budget.startDate, $lte: budget.endDate },
    };

    if (budget.type === 'category' && budget.categoryIds.length > 0) {
      filter.categoryId = { $in: budget.categoryIds };
    }

    const result = await Transaction.aggregate([
      { $match: filter },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    const spent = result.length > 0 ? result[0].total : 0;
    const remaining = budget.amount - spent;

    // Calculate daily spending for the period
    const dailySpending = await Transaction.aggregate([
      { $match: filter },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          total: { $sum: '$amount' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Health status
    const percentUsed = (spent / budget.amount) * 100;
    const today = new Date();
    const endDate = new Date(budget.endDate);
    const startDate = new Date(budget.startDate);
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const daysElapsed = Math.ceil((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const expectedPercent = (daysElapsed / totalDays) * 100;

    let status = 'healthy';
    if (percentUsed > 100) {
      status = 'over_budget';
    } else if (percentUsed > expectedPercent + 20) {
      status = 'at_risk';
    } else if (percentUsed > expectedPercent + 10) {
      status = 'warning';
    }

    res.json({
      budget,
      spent,
      remaining,
      percentUsed: Math.round(percentUsed * 100) / 100,
      status,
      dailySpending,
      recommendation: getRecommendation(status, remaining, Math.max(1, Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)))),
    });
  } catch (error) {
    next(error);
  }
};

// Helper function
const getRecommendation = (status: string, remaining: number, daysLeft: number): string => {
  switch (status) {
    case 'over_budget':
      return 'You have exceeded your budget. Consider reducing spending or adjusting your budget.';
    case 'at_risk':
      return `Spending is high. Try to limit daily spending to ${Math.round(remaining / daysLeft)} to stay on track.`;
    case 'warning':
      return `Keep an eye on spending. Recommended daily limit: ${Math.round(remaining / daysLeft)}.`;
    default:
      return `You're on track! Daily budget: ${Math.round(remaining / daysLeft)}.`;
  }
};

// @desc    Get daily guidance
// @route   GET /api/insights/daily-guidance?profileId=
// @access  Private
export const getDailyGuidance = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { profileId } = req.query;

    // Verify profile belongs to user
    const profile = await Profile.findOne({
      _id: profileId,
      userId: req.user?._id,
    });

    if (!profile) {
      res.status(404);
      throw new Error('Profile not found');
    }

    // Get active budgets
    const today = new Date();
    const activeBudgets = await Budget.find({
      profileId,
      startDate: { $lte: today },
      endDate: { $gte: today },
    });

    interface GuidanceItem {
      budgetName: string;
      dailyLimit: number;
      todaySpent: number;
      excess: number;
      suggestion: string;
    }

    const guidance: GuidanceItem[] = [];

    for (const budget of activeBudgets) {
      const filter: Record<string, any> = {
        profileId: profile._id,
        type: 'expense',
        date: { $gte: budget.startDate, $lte: budget.endDate },
      };

      if (budget.type === 'category' && budget.categoryIds.length > 0) {
        filter.categoryId = { $in: budget.categoryIds };
      }

      const result = await Transaction.aggregate([
        { $match: filter },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]);

      const spent = result.length > 0 ? result[0].total : 0;
      const remaining = budget.amount - spent;
      const daysLeft = Math.max(1, Math.ceil((new Date(budget.endDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
      const dailyLimit = remaining / daysLeft;

      // Today's spending
      const startOfDay = new Date(today);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(today);
      endOfDay.setHours(23, 59, 59, 999);

      const todayFilter = { ...filter, date: { $gte: startOfDay, $lte: endOfDay } };
      const todayResult = await Transaction.aggregate([
        { $match: todayFilter },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]);

      const todaySpent = todayResult.length > 0 ? todayResult[0].total : 0;
      const excess = dailyLimit - todaySpent;

      guidance.push({
        budgetName: budget.name,
        dailyLimit: Math.round(dailyLimit * 100) / 100,
        todaySpent,
        excess: excess > 0 ? Math.round(excess * 100) / 100 : 0,
        suggestion:
          excess > 0
            ? `You can save ${Math.round(excess)} today!`
            : `You've exceeded today's limit by ${Math.abs(Math.round(excess))}.`,
      });
    }

    res.json({ date: new Date(), guidance });
  } catch (error) {
    next(error);
  }
};
