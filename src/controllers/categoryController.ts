import { Response, NextFunction } from 'express';
import Category from '../models/Category';
import Profile from '../models/Profile';
import { AuthRequest } from '../types';

// @desc    Create a new category
// @route   POST /api/categories
// @access  Private
export const createCategory = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { profileId, name, icon, type, parentId } = req.body;

    // Verify profile belongs to user
    const profile = await Profile.findOne({
      _id: profileId,
      userId: req.user?._id,
    });

    if (!profile) {
      res.status(404);
      throw new Error('Profile not found');
    }

    const category = await Category.create({
      profileId,
      name,
      icon,
      type,
      parentId,
      isSystem: false,
    });

    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all categories for a profile (including system defaults)
// @route   GET /api/categories?profileId=
// @access  Private
export const getCategories = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { profileId, type } = req.query;

    // Verify profile belongs to user
    const profile = await Profile.findOne({
      _id: profileId,
      userId: req.user?._id,
    });

    if (!profile) {
      res.status(404);
      throw new Error('Profile not found');
    }

    const filter: Record<string, any> = {
      $or: [{ profileId }, { isSystem: true }],
    };

    if (type) {
      filter.type = type;
    }

    const categories = await Category.find(filter).populate('parentId');
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private
export const updateCategory = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      res.status(404);
      throw new Error('Category not found');
    }

    // Can't update system categories
    if (category.isSystem) {
      res.status(403);
      throw new Error('Cannot modify system categories');
    }

    // Verify profile belongs to user
    const profile = await Profile.findOne({
      _id: category.profileId,
      userId: req.user?._id,
    });

    if (!profile) {
      res.status(403);
      throw new Error('Not authorized');
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedCategory);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private
export const deleteCategory = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      res.status(404);
      throw new Error('Category not found');
    }

    // Can't delete system categories
    if (category.isSystem) {
      res.status(403);
      throw new Error('Cannot delete system categories');
    }

    // Verify profile belongs to user
    const profile = await Profile.findOne({
      _id: category.profileId,
      userId: req.user?._id,
    });

    if (!profile) {
      res.status(403);
      throw new Error('Not authorized');
    }

    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category removed' });
  } catch (error) {
    next(error);
  }
};
