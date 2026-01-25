import express from 'express';
import {
  createBudget,
  getBudgets,
  getBudgetSummary,
  updateBudget,
  deleteBudget,
} from '../controllers/budgetController';
import { protect } from '../middlewares/authMiddleware';
import { budgetValidator, mongoIdParam, validate } from '../middlewares/validators';

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * /api/budgets:
 *   post:
 *     summary: Create a new budget
 *     tags: [Budgets]
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
 *               - amount
 *               - startDate
 *               - endDate
 *             properties:
 *               profileId:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *               name:
 *                 type: string
 *                 example: January Budget
 *               amount:
 *                 type: number
 *                 minimum: 0
 *                 example: 50000
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-01-01
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-01-31
 *               type:
 *                 type: string
 *                 enum: [overall, category]
 *                 example: overall
 *               categoryIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Budget created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Budget'
 *       400:
 *         description: Invalid input
 *   get:
 *     summary: Get all budgets for a profile
 *     tags: [Budgets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: profileId
 *         required: true
 *         schema:
 *           type: string
 *         description: Profile ID
 *     responses:
 *       200:
 *         description: List of budgets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Budget'
 */
router.route('/')
  .post(budgetValidator, validate, createBudget)
  .get(getBudgets);

/**
 * @swagger
 * /api/budgets/{id}:
 *   put:
 *     summary: Update a budget
 *     tags: [Budgets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Budget ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               amount:
 *                 type: number
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               categoryIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Budget updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Budget'
 *       404:
 *         description: Budget not found
 *   delete:
 *     summary: Delete a budget
 *     tags: [Budgets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Budget ID
 *     responses:
 *       200:
 *         description: Budget deleted successfully
 *       404:
 *         description: Budget not found
 */
router.route('/:id')
  .put(mongoIdParam('id'), validate, updateBudget)
  .delete(mongoIdParam('id'), validate, deleteBudget);

/**
 * @swagger
 * /api/budgets/{id}/summary:
 *   get:
 *     summary: Get budget summary with calculations
 *     tags: [Budgets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Budget ID
 *     responses:
 *       200:
 *         description: Budget summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 budget:
 *                   $ref: '#/components/schemas/Budget'
 *                 summary:
 *                   type: object
 *                   properties:
 *                     spent:
 *                       type: number
 *                     remaining:
 *                       type: number
 *                     percentUsed:
 *                       type: number
 *                     dailyLimit:
 *                       type: number
 *                     daysLeft:
 *                       type: integer
 *                     forecastSpend:
 *                       type: number
 *                     willOverrun:
 *                       type: boolean
 *       404:
 *         description: Budget not found
 */
router.get('/:id/summary', mongoIdParam('id'), validate, getBudgetSummary);

export default router;
