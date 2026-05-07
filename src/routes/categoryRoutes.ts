import express from "express";
import {
  createCategory,
  getCategories,
  addDefaultCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController";
import { protect } from "../middlewares/authMiddleware";
import {
  categoryValidator,
  mongoIdParam,
  validate,
} from "../middlewares/validators";

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - profileId
 *               - name
 *               - type
 *             properties:
 *               profileId:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *               name:
 *                 type: string
 *                 example: Food & Dining
 *               icon:
 *                 type: string
 *                 example: food-icon
 *               color:
 *                 type: string
 *                 example: '#FF7043'
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *                 example: expense
 *               parentId:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Invalid input
 *   get:
 *     summary: Get all categories for a profile
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: profileId
 *         required: true
 *         schema:
 *           type: string
 *         description: Profile ID
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [income, expense]
 *         description: Filter by category type
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router
  .route("/")
  .post(categoryValidator, validate, createCategory)
  .get(getCategories);

/**
 * @swagger
 * /api/categories/defaults:
 *   post:
 *     summary: Seed default system categories
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *               - icon
 *               - color
 *             properties:
 *               name:
 *                 type: string
 *                 example: Food & Dining
 *               icon:
 *                 type: string
 *                 example: food-icon
 *               color:
 *                 type: string
 *                 example: '#FF7043'
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *                 example: expense
 *     responses:
 *       201:
 *         description: Default categories seeded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.route("/defaults").post(addDefaultCategories);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Update a category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               icon:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       403:
 *         description: Cannot modify system categories
 *       404:
 *         description: Category not found
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       403:
 *         description: Cannot delete system categories
 *       404:
 *         description: Category not found
 */
router
  .route("/:id")
  .put(mongoIdParam("id"), validate, updateCategory)
  .delete(mongoIdParam("id"), validate, deleteCategory);

export default router;
