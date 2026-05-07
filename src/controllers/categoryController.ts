import { Response, NextFunction } from "express";
import Category from "../models/Category";
import Profile from "../models/Profile";
import { AuthRequest } from "../types";
import { DEFAULT_CATEGORIES } from "../constants/defaultCategories";

// @desc    Create a new category
// @route   POST /api/categories
// @access  Private
export const createCategory = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { profileId, name, icon, color, type, parentId } = req.body;

    // Verify profile belongs to user
    const profile = await Profile.findOne({
      _id: profileId,
      userId: req.user?._id,
    });

    if (!profile) {
      res.status(404);
      throw new Error("Profile not found");
    }

    const category = await Category.create({
      profileId,
      name,
      icon,
      color,
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
export const getCategories = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { profileId, type } = req.query;

    // Verify profile belongs to user
    const profile = await Profile.findOne({
      _id: profileId,
      userId: req.user?._id,
    });

    if (!profile) {
      res.status(404);
      throw new Error("Profile not found");
    }

    const filter: Record<string, any> = {
      $or: [{ profileId }, { isSystem: true }],
    };

    if (type) {
      filter.type = type;
    }

    const categories = await Category.find(filter).populate("parentId");
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

// @desc    Seed system default categories
// @route   POST /api/categories/defaults
// @access  Private
export const addDefaultCategories = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const categories = req.body;
    if (!categories || !Array.isArray(categories) || categories.length === 0) {
      res.status(400);
      if (!Array.isArray(categories)) {
        throw new Error("Request body must be an array of categories");
      }
      throw new Error("Request body is required");
    }
    const operations = categories.map(({ name, icon, color, type }) => ({
      updateOne: {
        filter: { name, type, isSystem: true },
        update: {
          $setOnInsert: {
            name,
            type,
            isSystem: true,
            profileId: null,
          },
          $set: {
            icon,
            color,
            isSystem: true,
            profileId: null,
          },
        },
        upsert: true,
      },
    }));

    await Category.bulkWrite(operations, { ordered: false });

    const fetchedCategories = await Category.find({ isSystem: true }).populate(
      "parentId",
    );
    res.status(201).json(fetchedCategories);
  } catch (error) {
    next(error);
  }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private
export const updateCategory = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }

    // Can't update system categories
    if (category.isSystem) {
      res.status(403);
      throw new Error("Cannot modify system categories");
    }

    // Verify profile belongs to user
    const profile = await Profile.findOne({
      _id: category.profileId,
      userId: req.user?._id,
    });

    if (!profile) {
      res.status(403);
      throw new Error("Not authorized");
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    res.json(updatedCategory);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private
export const deleteCategory = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }

    // Can't delete system categories
    if (category.isSystem) {
      res.status(403);
      throw new Error("Cannot delete system categories");
    }

    // Verify profile belongs to user
    const profile = await Profile.findOne({
      _id: category.profileId,
      userId: req.user?._id,
    });

    if (!profile) {
      res.status(403);
      throw new Error("Not authorized");
    }

    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category removed" });
  } catch (error) {
    next(error);
  }
};
