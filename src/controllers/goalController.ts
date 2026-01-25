import { Response, NextFunction } from 'express';
import Goal from '../models/Goal';
import GoalContribution from '../models/GoalContribution';
import Profile from '../models/Profile';
import { AuthRequest, IProfile } from '../types';

// @desc    Create a new goal
// @route   POST /api/goals
// @access  Private
export const createGoal = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { profileId, name, targetAmount, targetDate } = req.body;

    // Verify profile belongs to user
    const profile = await Profile.findOne({
      _id: profileId,
      userId: req.user?._id,
    });

    if (!profile) {
      res.status(404);
      throw new Error('Profile not found');
    }

    const goal = await Goal.create({
      profileId,
      name,
      targetAmount,
      targetDate,
      currentAmount: 0,
      status: 'active',
    });

    res.status(201).json(goal);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all goals for a profile
// @route   GET /api/goals?profileId=
// @access  Private
export const getGoals = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { profileId, status } = req.query;

    // Verify profile belongs to user
    const profile = await Profile.findOne({
      _id: profileId,
      userId: req.user?._id,
    });

    if (!profile) {
      res.status(404);
      throw new Error('Profile not found');
    }

    const filter: Record<string, any> = { profileId };
    if (status) filter.status = status;

    const goals = await Goal.find(filter);
    res.json(goals);
  } catch (error) {
    next(error);
  }
};

// @desc    Get goal summary with calculations
// @route   GET /api/goals/:id/summary
// @access  Private
export const getGoalSummary = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const goal = await Goal.findById(req.params.id).populate('profileId');

    if (!goal) {
      res.status(404);
      throw new Error('Goal not found');
    }

    // Verify profile belongs to user
    const profile = goal.profileId as IProfile;
    if (profile.userId.toString() !== req.user?._id.toString()) {
      res.status(403);
      throw new Error('Not authorized');
    }

    // Get contributions
    const contributions = await GoalContribution.find({ goalId: goal._id }).sort({ date: -1 });

    // Calculate months left
    const today = new Date();
    const targetDate = new Date(goal.targetDate);
    const monthsLeft = Math.max(1, Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30)));

    // Calculate required per month
    const remaining = goal.targetAmount - goal.currentAmount;
    const requiredPerMonth = remaining / monthsLeft;

    // Progress percentage
    const progress = (goal.currentAmount / goal.targetAmount) * 100;

    // On track calculation
    const createdAt = new Date(goal.createdAt);
    const totalMonths = Math.ceil((targetDate.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24 * 30));
    const monthsElapsed = Math.ceil((today.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24 * 30));
    const expectedProgress = (monthsElapsed / totalMonths) * 100;
    const onTrack = progress >= expectedProgress;

    res.json({
      goal,
      contributions,
      summary: {
        remaining,
        progress: Math.round(progress * 100) / 100,
        monthsLeft,
        requiredPerMonth: Math.round(requiredPerMonth * 100) / 100,
        onTrack,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Contribute to a goal
// @route   POST /api/goals/:id/contribute
// @access  Private
export const contributeToGoal = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { amount, source, note } = req.body;

    const goal = await Goal.findById(req.params.id).populate('profileId');

    if (!goal) {
      res.status(404);
      throw new Error('Goal not found');
    }

    // Verify profile belongs to user
    const profile = goal.profileId as IProfile;
    if (profile.userId.toString() !== req.user?._id.toString()) {
      res.status(403);
      throw new Error('Not authorized');
    }

    if (goal.status !== 'active') {
      res.status(400);
      throw new Error('Cannot contribute to inactive goal');
    }

    // Create contribution
    const contribution = await GoalContribution.create({
      goalId: goal._id,
      profileId: profile._id,
      amount,
      source: source || 'manual',
      note,
      date: new Date(),
    });

    // Update goal
    goal.currentAmount += amount;
    if (goal.currentAmount >= goal.targetAmount) {
      goal.status = 'completed';
    }
    await goal.save();

    res.status(201).json({ contribution, goal });
  } catch (error) {
    next(error);
  }
};

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
export const updateGoal = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const goal = await Goal.findById(req.params.id).populate('profileId');

    if (!goal) {
      res.status(404);
      throw new Error('Goal not found');
    }

    // Verify profile belongs to user
    const profile = goal.profileId as IProfile;
    if (profile.userId.toString() !== req.user?._id.toString()) {
      res.status(403);
      throw new Error('Not authorized');
    }

    const updatedGoal = await Goal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedGoal);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
export const deleteGoal = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const goal = await Goal.findById(req.params.id).populate('profileId');

    if (!goal) {
      res.status(404);
      throw new Error('Goal not found');
    }

    // Verify profile belongs to user
    const profile = goal.profileId as IProfile;
    if (profile.userId.toString() !== req.user?._id.toString()) {
      res.status(403);
      throw new Error('Not authorized');
    }

    // Delete contributions
    await GoalContribution.deleteMany({ goalId: goal._id });

    await Goal.findByIdAndDelete(req.params.id);
    res.json({ message: 'Goal removed' });
  } catch (error) {
    next(error);
  }
};
