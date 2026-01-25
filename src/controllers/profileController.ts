import { Response, NextFunction } from 'express';
import Profile from '../models/Profile';
import { AuthRequest } from '../types';

// @desc    Create a new profile
// @route   POST /api/profiles
// @access  Private
export const createProfile = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, type, currency, defaultBudgetCycle, monthStartDay } = req.body;

    const profile = await Profile.create({
      userId: req.user?._id,
      name,
      type,
      currency,
      defaultBudgetCycle,
      monthStartDay,
    });

    res.status(201).json(profile);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all profiles for user
// @route   GET /api/profiles
// @access  Private
export const getProfiles = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const profiles = await Profile.find({ userId: req.user?._id });
    res.json(profiles);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single profile
// @route   GET /api/profiles/:id
// @access  Private
export const getProfile = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const profile = await Profile.findOne({
      _id: req.params.id,
      userId: req.user?._id,
    });

    if (!profile) {
      res.status(404);
      throw new Error('Profile not found');
    }

    res.json(profile);
  } catch (error) {
    next(error);
  }
};

// @desc    Update profile
// @route   PUT /api/profiles/:id
// @access  Private
export const updateProfile = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { _id: req.params.id, userId: req.user?._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!profile) {
      res.status(404);
      throw new Error('Profile not found');
    }

    res.json(profile);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete profile
// @route   DELETE /api/profiles/:id
// @access  Private
export const deleteProfile = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const profile = await Profile.findOneAndDelete({
      _id: req.params.id,
      userId: req.user?._id,
    });

    if (!profile) {
      res.status(404);
      throw new Error('Profile not found');
    }

    res.json({ message: 'Profile removed' });
  } catch (error) {
    next(error);
  }
};
