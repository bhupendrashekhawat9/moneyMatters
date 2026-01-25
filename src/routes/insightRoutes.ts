import express from 'express';
import {
  getMonthlySummary,
  getCategoryDistribution,
  getBudgetHealth,
  getDailyGuidance,
} from '../controllers/insightController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * /api/insights/monthly:
 *   get:
 *     summary: Get monthly financial summary
 *     tags: [Insights]
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
 *         name: month
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *         description: Month (1-12)
 *       - in: query
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         description: Year
 *     responses:
 *       200:
 *         description: Monthly summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 period:
 *                   type: object
 *                   properties:
 *                     startDate:
 *                       type: string
 *                       format: date-time
 *                     endDate:
 *                       type: string
 *                       format: date-time
 *                 income:
 *                   type: number
 *                 expense:
 *                   type: number
 *                 savings:
 *                   type: number
 *                 savingsRate:
 *                   type: number
 *                 transactionCount:
 *                   type: integer
 */
router.get('/monthly', getMonthlySummary);

/**
 * @swagger
 * /api/insights/categories:
 *   get:
 *     summary: Get category-wise spending distribution
 *     tags: [Insights]
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
 *         name: month
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *         description: Month (1-12)
 *       - in: query
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         description: Year
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [income, expense]
 *           default: expense
 *         description: Transaction type
 *     responses:
 *       200:
 *         description: Category distribution
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 period:
 *                   type: object
 *                   properties:
 *                     startDate:
 *                       type: string
 *                       format: date-time
 *                     endDate:
 *                       type: string
 *                       format: date-time
 *                 type:
 *                   type: string
 *                 grandTotal:
 *                   type: number
 *                 distribution:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       categoryId:
 *                         type: string
 *                       categoryName:
 *                         type: string
 *                       categoryIcon:
 *                         type: string
 *                       total:
 *                         type: number
 *                       count:
 *                         type: integer
 *                       percentage:
 *                         type: number
 */
router.get('/categories', getCategoryDistribution);

/**
 * @swagger
 * /api/insights/budget-health:
 *   get:
 *     summary: Get budget health analysis
 *     tags: [Insights]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: budgetId
 *         required: true
 *         schema:
 *           type: string
 *         description: Budget ID
 *     responses:
 *       200:
 *         description: Budget health analysis
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 budget:
 *                   $ref: '#/components/schemas/Budget'
 *                 spent:
 *                   type: number
 *                 remaining:
 *                   type: number
 *                 percentUsed:
 *                   type: number
 *                 status:
 *                   type: string
 *                   enum: [healthy, warning, at_risk, over_budget]
 *                 dailySpending:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       total:
 *                         type: number
 *                 recommendation:
 *                   type: string
 */
router.get('/budget-health', getBudgetHealth);

/**
 * @swagger
 * /api/insights/daily-guidance:
 *   get:
 *     summary: Get daily spending guidance
 *     tags: [Insights]
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
 *         description: Daily guidance for active budgets
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 date:
 *                   type: string
 *                   format: date-time
 *                 guidance:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       budgetName:
 *                         type: string
 *                       dailyLimit:
 *                         type: number
 *                       todaySpent:
 *                         type: number
 *                       excess:
 *                         type: number
 *                       suggestion:
 *                         type: string
 */
router.get('/daily-guidance', getDailyGuidance);

export default router;
