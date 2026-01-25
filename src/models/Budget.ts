import mongoose, { Schema, Model } from 'mongoose';
import { IBudget } from '../types';

const budgetSchema = new Schema<IBudget>(
  {
    profileId: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Budget name is required'],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, 'Budget amount is required'],
      min: 0,
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
    },
    type: {
      type: String,
      enum: ['overall', 'category'],
      default: 'overall',
    },
    categoryIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
budgetSchema.index({ profileId: 1 });
budgetSchema.index({ profileId: 1, startDate: 1, endDate: 1 });

const Budget: Model<IBudget> = mongoose.model<IBudget>('Budget', budgetSchema);

export default Budget;
