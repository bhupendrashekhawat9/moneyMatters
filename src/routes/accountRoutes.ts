import express from 'express';
import {
  createAccount,
  getAccounts,
  getAccount,
  updateAccount,
  deleteAccount,
} from '../controllers/accountController';
import { protect } from '../middlewares/authMiddleware';
import { accountValidator, mongoIdParam, validate } from '../middlewares/validators';

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * /api/accounts:
 *   post:
 *     summary: Create a new account
 *     tags: [Accounts]
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
 *                 example: HDFC Savings
 *               type:
 *                 type: string
 *                 enum: [bank, cash, credit_card]
 *                 example: bank
 *               openingBalance:
 *                 type: number
 *                 example: 10000
 *     responses:
 *       201:
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       400:
 *         description: Invalid input
 *   get:
 *     summary: Get all accounts for a profile
 *     tags: [Accounts]
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
 *         description: List of accounts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Account'
 */
router.route('/')
  .post(accountValidator, validate, createAccount)
  .get(getAccounts);

/**
 * @swagger
 * /api/accounts/{id}:
 *   get:
 *     summary: Get a single account
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Account ID
 *     responses:
 *       200:
 *         description: Account details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       404:
 *         description: Account not found
 *   put:
 *     summary: Update an account
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Account ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [bank, cash, credit_card]
 *     responses:
 *       200:
 *         description: Account updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       404:
 *         description: Account not found
 *   delete:
 *     summary: Delete an account
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Account ID
 *     responses:
 *       200:
 *         description: Account deleted successfully
 *       404:
 *         description: Account not found
 */
router.route('/:id')
  .get(mongoIdParam('id'), validate, getAccount)
  .put(mongoIdParam('id'), validate, updateAccount)
  .delete(mongoIdParam('id'), validate, deleteAccount);

export default router;
