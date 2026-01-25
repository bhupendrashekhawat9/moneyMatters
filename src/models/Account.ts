import mongoose, { Schema, Model } from 'mongoose';
import { IAccount } from '../types';

const accountSchema = new Schema<IAccount>(
  {
    profileId: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Account name is required'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['bank', 'cash', 'credit_card'],
      required: [true, 'Account type is required'],
    },
    openingBalance: {
      type: Number,
      default: 0,
    },
    currentBalance: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
accountSchema.index({ profileId: 1 });

const Account: Model<IAccount> = mongoose.model<IAccount>('Account', accountSchema);

export default Account;
