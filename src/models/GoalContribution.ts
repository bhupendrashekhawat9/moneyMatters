import mongoose, { Schema, Model } from 'mongoose';
import { IGoalContribution } from '../types';

const goalContributionSchema = new Schema<IGoalContribution>(
  {
    goalId: {
      type: Schema.Types.ObjectId,
      ref: 'Goal',
      required: true,
    },
    profileId: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
      required: true,
    },
    amount: {
      type: Number,
      required: [true, 'Contribution amount is required'],
      min: 0,
    },
    source: {
      type: String,
      enum: ['manual', 'excess_saving', 'transfer'],
      default: 'manual',
    },
    date: {
      type: Date,
      default: Date.now,
    },
    note: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
goalContributionSchema.index({ goalId: 1 });
goalContributionSchema.index({ profileId: 1, date: -1 });

const GoalContribution: Model<IGoalContribution> = mongoose.model<IGoalContribution>('GoalContribution', goalContributionSchema);

export default GoalContribution;
