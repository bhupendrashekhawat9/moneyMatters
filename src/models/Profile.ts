import mongoose, { Schema, Model } from 'mongoose';
import { IProfile } from '../types';

const profileSchema = new Schema<IProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Profile name is required'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['self', 'family', 'wife', 'business', 'trip', 'other'],
      default: 'self',
    },
    currency: {
      type: String,
      default: 'INR',
    },
    defaultBudgetCycle: {
      type: String,
      enum: ['monthly', 'weekly', 'custom'],
      default: 'monthly',
    },
    monthStartDay: {
      type: Number,
      min: 1,
      max: 28,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
profileSchema.index({ userId: 1 });

const Profile: Model<IProfile> = mongoose.model<IProfile>('Profile', profileSchema);

export default Profile;
