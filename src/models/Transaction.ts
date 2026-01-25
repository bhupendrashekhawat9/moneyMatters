import mongoose, { Schema, Model } from 'mongoose';
import { ITransaction } from '../types';

const transactionSchema = new Schema<ITransaction>(
  {
    profileId: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
      required: true,
    },
    accountId: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: [true, 'Transaction type is required'],
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: 0,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    note: {
      type: String,
      trim: true,
    },
    paymentMode: {
      type: String,
      enum: ['cash', 'card', 'upi', 'bank_transfer', 'other'],
      default: 'other',
    },
    isRecurring: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes for optimized queries
transactionSchema.index({ profileId: 1, date: -1 });
transactionSchema.index({ profileId: 1, categoryId: 1 });
transactionSchema.index({ profileId: 1, accountId: 1 });

const Transaction: Model<ITransaction> = mongoose.model<ITransaction>('Transaction', transactionSchema);

export default Transaction;
