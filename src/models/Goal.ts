import mongoose, { Schema, Model } from 'mongoose';
import { IGoal } from '../types';

const goalSchema = new Schema<IGoal>(
  {
    profileId: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Goal name is required'],
      trim: true,
    },
    targetAmount: {
      type: Number,
      required: [true, 'Target amount is required'],
      min: 0,
    },
    targetDate: {
      type: Date,
      required: [true, 'Target date is required'],
    },
    currentAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'cancelled'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
goalSchema.index({ profileId: 1 });
goalSchema.index({ profileId: 1, status: 1 });

const Goal: Model<IGoal> = mongoose.model<IGoal>('Goal', goalSchema);

export default Goal;
