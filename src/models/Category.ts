import mongoose, { Schema, Model } from 'mongoose';
import { ICategory } from '../types';

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
    },
    icon: {
      type: String,
      default: 'default-icon',
    },
    color: {
      type: String,
      default: '#BDBDBD',
    },
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: [true, 'Category type is required'],
    },
    profileId: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
      default: null,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      default: null,
    },
    isSystem: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
categorySchema.index({ profileId: 1 });
categorySchema.index({ type: 1 });

const Category: Model<ICategory> = mongoose.model<ICategory>('Category', categorySchema);

export default Category;
