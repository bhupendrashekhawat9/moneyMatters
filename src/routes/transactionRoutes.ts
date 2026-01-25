import express from 'express';
import {
  createTransaction,
  getTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
} from '../controllers/transactionController';
import { protect } from '../middlewares/authMiddleware';
import { transactionValidator, mongoIdParam, validate } from '../middlewares/validators';

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
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
 *               - accountId
 *               - categoryId
 *               - type
 *               - amount
 *             properties:
 *               profileId:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *               accountId:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *               categoryId:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *                 example: expense
 *               amount:
 *                 type: number
 *                 minimum: 0
 *                 example: 500
 *               date:
 *                 type: string
 *                 format: date-time
 *               note:
 *                 type: string
 *                 example: Lunch at restaurant
 *               paymentMode:
 *                 type: string
 *                 enum: [cash, card, upi, bank_transfer, other]
 *                 example: upi
 *               isRecurring:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       400:
 *         description: Invalid input
 *   get:
 *     summary: Get all transactions for a profile
 *     tags: [Transactions]
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
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date filter
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *         description: End date filter
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Category ID filter
 *       - in: query
 *         name: accountId
 *         schema:
 *           type: string
 *         description: Account ID filter
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [income, expense]
 *         description: Transaction type filter
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *         description: Number of results per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *     responses:
 *       200:
 *         description: List of transactions with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 transactions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Transaction'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     total:
 *                       type: integer
 *                     pages:
 *                       type: integer
 */
router.route('/')
  .post(transactionValidator, validate, createTransaction)
  .get(getTransactions);

/**
 * @swagger
 * /api/transactions/{id}:
 *   get:
 *     summary: Get a single transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     responses:
 *       200:
 *         description: Transaction details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: Transaction not found
 *   put:
 *     summary: Update a transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               categoryId:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               note:
 *                 type: string
 *               paymentMode:
 *                 type: string
 *                 enum: [cash, card, upi, bank_transfer, other]
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: Transaction not found
 *   delete:
 *     summary: Delete a transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 *       404:
 *         description: Transaction not found
 */
router.route('/:id')
  .get(mongoIdParam('id'), validate, getTransaction)
  .put(mongoIdParam('id'), validate, updateTransaction)
  .delete(mongoIdParam('id'), validate, deleteTransaction);

export default router;
