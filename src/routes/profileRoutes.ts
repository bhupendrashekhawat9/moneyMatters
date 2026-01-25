import express from 'express';
import {
  createProfile,
  getProfiles,
  getProfile,
  updateProfile,
  deleteProfile,
} from '../controllers/profileController';
import { protect } from '../middlewares/authMiddleware';
import { profileValidator, mongoIdParam, validate } from '../middlewares/validators';

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * /api/profiles:
 *   post:
 *     summary: Create a new profile
 *     tags: [Profiles]
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
 *             properties:
 *               name:
 *                 type: string
 *                 example: Personal
 *               type:
 *                 type: string
 *                 enum: [self, family, wife, business, trip, other]
 *                 example: self
 *               currency:
 *                 type: string
 *                 example: INR
 *               defaultBudgetCycle:
 *                 type: string
 *                 enum: [monthly, weekly, custom]
 *                 example: monthly
 *               monthStartDay:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 28
 *                 example: 1
 *     responses:
 *       201:
 *         description: Profile created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       400:
 *         description: Invalid input
 *   get:
 *     summary: Get all profiles for the user
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of profiles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profile'
 */
router.route('/')
  .post(profileValidator, validate, createProfile)
  .get(getProfiles);

/**
 * @swagger
 * /api/profiles/{id}:
 *   get:
 *     summary: Get a single profile
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Profile ID
 *     responses:
 *       200:
 *         description: Profile details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       404:
 *         description: Profile not found
 *   put:
 *     summary: Update a profile
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Profile ID
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
 *                 enum: [self, family, wife, business, trip, other]
 *               currency:
 *                 type: string
 *               defaultBudgetCycle:
 *                 type: string
 *                 enum: [monthly, weekly, custom]
 *               monthStartDay:
 *                 type: number
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       404:
 *         description: Profile not found
 *   delete:
 *     summary: Delete a profile
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Profile ID
 *     responses:
 *       200:
 *         description: Profile deleted successfully
 *       404:
 *         description: Profile not found
 */
router.route('/:id')
  .get(mongoIdParam('id'), validate, getProfile)
  .put(mongoIdParam('id'), validate, updateProfile)
  .delete(mongoIdParam('id'), validate, deleteProfile);

export default router;
