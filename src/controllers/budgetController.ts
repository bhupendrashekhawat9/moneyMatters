import { Response, NextFunction } from 'express';
import Budget from '../models/Budget';
import Transaction from '../models/Transaction';
import Profile from '../models/Profile';
import { AuthRequest, IProfile } from '../types';

// @desc    Create a new budget
// @route   POST /api/budgets
// @access  Private
export const createBudget = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { profileId, name, amount, startDate, endDate, type, categoryIds } = req.body;

    // Verify profile belongs to user
    const profile = await Profile.findOne({
      _id: profileId,
      userId: req.user?._id,
    });

    if (!profile) {
      res.status(404);
      throw new Error('Profile not found');
    }

    const budget = await Budget.create({
      profileId,
      name,
      amount,
      startDate,
      endDate,
      type: type || 'overall',
      categoryIds: categoryIds || [],
    });

    res.status(201).json(budget);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all budgets for a profile
// @route   GET /api/budgets?profileId=
// @access  Private
export const getBudgets = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
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

    const budgets = await Budget.find({ profileId }).populate('categoryIds');
    res.json(budgets);
  } catch (error) {
    next(error);
  }
};

// @desc    Get budget summary with calculations
// @route   GET /api/budgets/:id/summary
// @access  Private
export const getBudgetSummary = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const budget = await Budget.findById(req.params.id).populate('profileId').populate('categoryIds');

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

    // Daily limit calculation
    const today = new Date();
    const endDate = new Date(budget.endDate);
    const daysLeft = Math.max(1, Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
    const dailyLimit = remaining / daysLeft;

    // Forecast
    const startDate = new Date(budget.startDate);
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const daysElapsed = Math.ceil((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const avgDailySpend = daysElapsed > 0 ? spent / daysElapsed : 0;
    const forecastSpend = avgDailySpend * totalDays;

    res.json({
      budget,
      summary: {
        spent,
        remaining,
        percentUsed: Math.round((spent / budget.amount) * 100 * 100) / 100,
        dailyLimit: Math.round(dailyLimit * 100) / 100,
        daysLeft,
        forecastSpend: Math.round(forecastSpend * 100) / 100,
        willOverrun: forecastSpend > budget.amount,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update budget
// @route   PUT /api/budgets/:id
// @access  Private
export const updateBudget = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const budget = await Budget.findById(req.params.id).populate('profileId');

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

    const updatedBudget = await Budget.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedBudget);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete budget
// @route   DELETE /api/budgets/:id
// @access  Private
export const deleteBudget = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const budget = await Budget.findById(req.params.id).populate('profileId');

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

    await Budget.findByIdAndDelete(req.params.id);
    res.json({ message: 'Budget removed' });
  } catch (error) {
    next(error);
  }
};
