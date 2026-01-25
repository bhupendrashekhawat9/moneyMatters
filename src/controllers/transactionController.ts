import { Response, NextFunction } from 'express';
import Transaction from '../models/Transaction';
import Account from '../models/Account';
import Profile from '../models/Profile';
import { AuthRequest, IProfile } from '../types';

// @desc    Create a new transaction
// @route   POST /api/transactions
// @access  Private
export const createTransaction = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { profileId, accountId, type, amount, categoryId, date, note, paymentMode, isRecurring } = req.body;

    // Verify profile belongs to user
    const profile = await Profile.findOne({
      _id: profileId,
      userId: req.user?._id,
    });

    if (!profile) {
      res.status(404);
      throw new Error('Profile not found');
    }

    // Verify account belongs to profile
    const account = await Account.findOne({
      _id: accountId,
      profileId,
    });

    if (!account) {
      res.status(404);
      throw new Error('Account not found');
    }

    // Create transaction
    const transaction = await Transaction.create({
      profileId,
      accountId,
      type,
      amount,
      categoryId,
      date: date || new Date(),
      note,
      paymentMode,
      isRecurring,
    });

    // Update account balance
    if (type === 'income') {
      account.currentBalance += amount;
    } else {
      account.currentBalance -= amount;
    }
    await account.save();

    res.status(201).json(transaction);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all transactions for a profile
// @route   GET /api/transactions?profileId=&from=&to=&category=
// @access  Private
export const getTransactions = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { profileId, from, to, category, accountId, type, limit = '50', page = '1' } = req.query;

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

    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = new Date(from as string);
      if (to) filter.date.$lte = new Date(to as string);
    }

    if (category) filter.categoryId = category;
    if (accountId) filter.accountId = accountId;
    if (type) filter.type = type;

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const transactions = await Transaction.find(filter)
      .populate('categoryId', 'name icon')
      .populate('accountId', 'name type')
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit as string));

    const total = await Transaction.countDocuments(filter);

    res.json({
      transactions,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        pages: Math.ceil(total / parseInt(limit as string)),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single transaction
// @route   GET /api/transactions/:id
// @access  Private
export const getTransaction = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const transaction = await Transaction.findById(req.params.id)
      .populate('profileId')
      .populate('categoryId')
      .populate('accountId');

    if (!transaction) {
      res.status(404);
      throw new Error('Transaction not found');
    }

    // Verify profile belongs to user
    const profile = transaction.profileId as IProfile;
    if (profile.userId.toString() !== req.user?._id.toString()) {
      res.status(403);
      throw new Error('Not authorized');
    }

    res.json(transaction);
  } catch (error) {
    next(error);
  }
};

// @desc    Update transaction
// @route   PUT /api/transactions/:id
// @access  Private
export const updateTransaction = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const transaction = await Transaction.findById(req.params.id).populate('profileId');

    if (!transaction) {
      res.status(404);
      throw new Error('Transaction not found');
    }

    // Verify profile belongs to user
    const profile = transaction.profileId as IProfile;
    if (profile.userId.toString() !== req.user?._id.toString()) {
      res.status(403);
      throw new Error('Not authorized');
    }

    // Revert old balance
    const oldAccount = await Account.findById(transaction.accountId);
    if (oldAccount) {
      if (transaction.type === 'income') {
        oldAccount.currentBalance -= transaction.amount;
      } else {
        oldAccount.currentBalance += transaction.amount;
      }
      await oldAccount.save();
    }

    // Update transaction
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (updatedTransaction) {
      // Apply new balance
      const newAccount = await Account.findById(updatedTransaction.accountId);
      if (newAccount) {
        if (updatedTransaction.type === 'income') {
          newAccount.currentBalance += updatedTransaction.amount;
        } else {
          newAccount.currentBalance -= updatedTransaction.amount;
        }
        await newAccount.save();
      }
    }

    res.json(updatedTransaction);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
// @access  Private
export const deleteTransaction = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const transaction = await Transaction.findById(req.params.id).populate('profileId');

    if (!transaction) {
      res.status(404);
      throw new Error('Transaction not found');
    }

    // Verify profile belongs to user
    const profile = transaction.profileId as IProfile;
    if (profile.userId.toString() !== req.user?._id.toString()) {
      res.status(403);
      throw new Error('Not authorized');
    }

    // Revert balance
    const account = await Account.findById(transaction.accountId);
    if (account) {
      if (transaction.type === 'income') {
        account.currentBalance -= transaction.amount;
      } else {
        account.currentBalance += transaction.amount;
      }
      await account.save();
    }

    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Transaction removed' });
  } catch (error) {
    next(error);
  }
};
