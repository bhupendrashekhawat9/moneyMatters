import express from 'express';
import {
  createGoal,
  getGoals,
  getGoalSummary,
  contributeToGoal,
  updateGoal,
  deleteGoal,
} from '../controllers/goalController';
import { protect } from '../middlewares/authMiddleware';
import { goalValidator, mongoIdParam, validate } from '../middlewares/validators';

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * /api/goals:
 *   post:
 *     summary: Create a new goal
 *     tags: [Goals]
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
 *               - targetAmount
 *               - targetDate
 *             properties:
 *               profileId:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *               name:
 *                 type: string
 *                 example: Emergency Fund
 *               targetAmount:
 *                 type: number
 *                 minimum: 0
 *                 example: 100000
 *               targetDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-12-31
 *     responses:
 *       201:
 *         description: Goal created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Goal'
 *       400:
 *         description: Invalid input
 *   get:
 *     summary: Get all goals for a profile
 *     tags: [Goals]
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
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, completed, cancelled]
 *         description: Filter by status
 *     responses:
 *       200:
 *         description: List of goals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Goal'
 */
router.route('/')
  .post(goalValidator, validate, createGoal)
  .get(getGoals);

/**
 * @swagger
 * /api/goals/{id}:
 *   put:
 *     summary: Update a goal
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Goal ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               targetAmount:
 *                 type: number
 *               targetDate:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 enum: [active, completed, cancelled]
 *     responses:
 *       200:
 *         description: Goal updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Goal'
 *       404:
 *         description: Goal not found
 *   delete:
 *     summary: Delete a goal
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Goal ID
 *     responses:
 *       200:
 *         description: Goal deleted successfully
 *       404:
 *         description: Goal not found
 */
router.route('/:id')
  .put(mongoIdParam('id'), validate, updateGoal)
  .delete(mongoIdParam('id'), validate, deleteGoal);

/**
 * @swagger
 * /api/goals/{id}/summary:
 *   get:
 *     summary: Get goal summary with calculations
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Goal ID
 *     responses:
 *       200:
 *         description: Goal summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 goal:
 *                   $ref: '#/components/schemas/Goal'
 *                 contributions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/GoalContribution'
 *                 summary:
 *                   type: object
 *                   properties:
 *                     remaining:
 *                       type: number
 *                     progress:
 *                       type: number
 *                     monthsLeft:
 *                       type: integer
 *                     requiredPerMonth:
 *                       type: number
 *                     onTrack:
 *                       type: boolean
 *       404:
 *         description: Goal not found
 */
router.get('/:id/summary', mongoIdParam('id'), validate, getGoalSummary);

/**
 * @swagger
 * /api/goals/{id}/contribute:
 *   post:
 *     summary: Contribute to a goal
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Goal ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *                 minimum: 0
 *                 example: 5000
 *               source:
 *                 type: string
 *                 enum: [manual, excess_saving, transfer]
 *                 example: manual
 *               note:
 *                 type: string
 *                 example: Monthly contribution
 *     responses:
 *       201:
 *         description: Contribution added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 contribution:
 *                   $ref: '#/components/schemas/GoalContribution'
 *                 goal:
 *                   $ref: '#/components/schemas/Goal'
 *       400:
 *         description: Cannot contribute to inactive goal
 *       404:
 *         description: Goal not found
 */
router.post('/:id/contribute', mongoIdParam('id'), validate, contributeToGoal);

export default router;
