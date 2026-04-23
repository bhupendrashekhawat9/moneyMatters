import { Request, Response, NextFunction } from 'express';
import { validationResult, body, param, ValidationChain } from 'express-validator';

export const validate = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

// Auth validators
export const registerValidator: ValidationChain[] = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

export const loginValidator: ValidationChain[] = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Profile validators
export const profileValidator: ValidationChain[] = [
  body('name').trim().notEmpty().withMessage('Profile name is required'),
  body('type')
    .optional()
    .isIn(['self', 'family', 'wife', 'business', 'trip', 'other'])
    .withMessage('Invalid profile type'),
];

// Account validators
export const accountValidator: ValidationChain[] = [
  body('name').trim().notEmpty().withMessage('Account name is required'),
  body('type')
    .isIn(['bank', 'cash', 'credit_card'])
    .withMessage('Invalid account type'),
  body('profileId').isMongoId().withMessage('Valid profile ID is required'),
];

// Transaction validators
export const transactionValidator: ValidationChain[] = [
  body('profileId').isMongoId().withMessage('Valid profile ID is required'),
  body('accountId').isMongoId().withMessage('Valid account ID is required'),
  body('categoryId').isMongoId().withMessage('Valid category ID is required'),
  body('type')
    .isIn(['income', 'expense'])
    .withMessage('Type must be income or expense'),
  body('amount')
    .isFloat({ min: 0 })
    .withMessage('Amount must be a positive number'),
];

// Budget validators
export const budgetValidator: ValidationChain[] = [
  body('profileId').isMongoId().withMessage('Valid profile ID is required'),
  body('name').trim().notEmpty().withMessage('Budget name is required'),
  body('amount')
    .isFloat({ min: 0 })
    .withMessage('Amount must be a positive number'),
  body('startDate').isISO8601().withMessage('Valid start date is required'),
  body('endDate').isISO8601().withMessage('Valid end date is required'),
];

// Goal validators
export const goalValidator: ValidationChain[] = [
  body('profileId').isMongoId().withMessage('Valid profile ID is required'),
  body('name').trim().notEmpty().withMessage('Goal name is required'),
  body('targetAmount')
    .isFloat({ min: 0 })
    .withMessage('Target amount must be a positive number'),
  body('targetDate').isISO8601().withMessage('Valid target date is required'),
];

// Category validators
export const categoryValidator: ValidationChain[] = [
  body('profileId').isMongoId().withMessage('Valid profile ID is required'),
  body('name').trim().notEmpty().withMessage('Category name is required'),
  body('type')
    .isIn(['income', 'expense'])
    .withMessage('Type must be income or expense'),
  body('color')
    .optional()
    .isHexColor()
    .withMessage('Color must be a valid hex code'),
];

// MongoDB ID param validator
export const mongoIdParam = (paramName: string): ValidationChain[] => [
  param(paramName).isMongoId().withMessage(`Valid ${paramName} is required`),
];
