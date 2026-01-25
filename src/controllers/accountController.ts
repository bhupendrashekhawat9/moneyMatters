import { Response, NextFunction } from 'express';
import Account from '../models/Account';
import Profile from '../models/Profile';
import { AuthRequest, IProfile } from '../types';

// @desc    Create a new account
// @route   POST /api/accounts
// @access  Private
export const createAccount = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { profileId, name, type, openingBalance } = req.body;

    // Verify profile belongs to user
    const profile = await Profile.findOne({
      _id: profileId,
      userId: req.user?._id,
    });

    if (!profile) {
      res.status(404);
      throw new Error('Profile not found');
    }

    const account = await Account.create({
      profileId,
      name,
      type,
      openingBalance: openingBalance || 0,
      currentBalance: openingBalance || 0,
    });

    res.status(201).json(account);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all accounts for a profile
// @route   GET /api/accounts?profileId=
// @access  Private
export const getAccounts = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
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

    const accounts = await Account.find({ profileId });
    res.json(accounts);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single account
// @route   GET /api/accounts/:id
// @access  Private
export const getAccount = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const account = await Account.findById(req.params.id).populate('profileId');

    if (!account) {
      res.status(404);
      throw new Error('Account not found');
    }

    // Verify profile belongs to user
    const profile = account.profileId as IProfile;
    if (profile.userId.toString() !== req.user?._id.toString()) {
      res.status(403);
      throw new Error('Not authorized');
    }

    res.json(account);
  } catch (error) {
    next(error);
  }
};

// @desc    Update account
// @route   PUT /api/accounts/:id
// @access  Private
export const updateAccount = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const account = await Account.findById(req.params.id).populate('profileId');

    if (!account) {
      res.status(404);
      throw new Error('Account not found');
    }

    // Verify profile belongs to user
    const profile = account.profileId as IProfile;
    if (profile.userId.toString() !== req.user?._id.toString()) {
      res.status(403);
      throw new Error('Not authorized');
    }

    const updatedAccount = await Account.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedAccount);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete account
// @route   DELETE /api/accounts/:id
// @access  Private
export const deleteAccount = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const account = await Account.findById(req.params.id).populate('profileId');

    if (!account) {
      res.status(404);
      throw new Error('Account not found');
    }

    // Verify profile belongs to user
    const profile = account.profileId as IProfile;
    if (profile.userId.toString() !== req.user?._id.toString()) {
      res.status(403);
      throw new Error('Not authorized');
    }

    await Account.findByIdAndDelete(req.params.id);
    res.json({ message: 'Account removed' });
  } catch (error) {
    next(error);
  }
};
