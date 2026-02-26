import swaggerJsdoc from 'swagger-jsdoc';
import { PORT } from './constants';


const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MoneyMatters API',
      version: '1.0.0',
      description: 'Personal Finance Management System API Documentation',
      contact: {
        name: 'API Support',
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server',
      },
       {
        url: 'https://appservice-server.onrender.com',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', format: 'email', example: 'john@example.com' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Profile: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            userId: { type: 'string', example: '507f1f77bcf86cd799439011' },
            name: { type: 'string', example: 'Personal' },
            type: { type: 'string', enum: ['self', 'family', 'wife', 'business', 'trip', 'other'], example: 'self' },
            currency: { type: 'string', example: 'INR' },
            defaultBudgetCycle: { type: 'string', enum: ['monthly', 'weekly', 'custom'], example: 'monthly' },
            monthStartDay: { type: 'number', minimum: 1, maximum: 28, example: 1 },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Account: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            profileId: { type: 'string', example: '507f1f77bcf86cd799439011' },
            name: { type: 'string', example: 'HDFC Savings' },
            type: { type: 'string', enum: ['bank', 'cash', 'credit_card'], example: 'bank' },
            openingBalance: { type: 'number', example: 10000 },
            currentBalance: { type: 'number', example: 15000 },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Category: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            name: { type: 'string', example: 'Food & Dining' },
            icon: { type: 'string', example: 'food-icon' },
            type: { type: 'string', enum: ['income', 'expense'], example: 'expense' },
            profileId: { type: 'string', nullable: true },
            parentId: { type: 'string', nullable: true },
            isSystem: { type: 'boolean', example: false },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Transaction: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            profileId: { type: 'string', example: '507f1f77bcf86cd799439011' },
            accountId: { type: 'string', example: '507f1f77bcf86cd799439011' },
            type: { type: 'string', enum: ['income', 'expense'], example: 'expense' },
            amount: { type: 'number', example: 500 },
            categoryId: { type: 'string', example: '507f1f77bcf86cd799439011' },
            date: { type: 'string', format: 'date-time' },
            note: { type: 'string', example: 'Lunch at restaurant' },
            paymentMode: { type: 'string', enum: ['cash', 'card', 'upi', 'bank_transfer', 'other'], example: 'upi' },
            isRecurring: { type: 'boolean', example: false },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Budget: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            profileId: { type: 'string', example: '507f1f77bcf86cd799439011' },
            name: { type: 'string', example: 'January Budget' },
            amount: { type: 'number', example: 50000 },
            startDate: { type: 'string', format: 'date', example: '2026-01-01' },
            endDate: { type: 'string', format: 'date', example: '2026-01-31' },
            type: { type: 'string', enum: ['overall', 'category'], example: 'overall' },
            categoryIds: { type: 'array', items: { type: 'string' } },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Goal: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            profileId: { type: 'string', example: '507f1f77bcf86cd799439011' },
            name: { type: 'string', example: 'Emergency Fund' },
            targetAmount: { type: 'number', example: 100000 },
            targetDate: { type: 'string', format: 'date', example: '2026-12-31' },
            currentAmount: { type: 'number', example: 25000 },
            status: { type: 'string', enum: ['active', 'completed', 'cancelled'], example: 'active' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        GoalContribution: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            goalId: { type: 'string', example: '507f1f77bcf86cd799439011' },
            profileId: { type: 'string', example: '507f1f77bcf86cd799439011' },
            amount: { type: 'number', example: 5000 },
            source: { type: 'string', enum: ['manual', 'excess_saving', 'transfer'], example: 'manual' },
            date: { type: 'string', format: 'date-time' },
            note: { type: 'string', example: 'Monthly contribution' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            stack: { type: 'string' },
          },
        },
        ValidationError: {
          type: 'object',
          properties: {
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  msg: { type: 'string' },
                  param: { type: 'string' },
                  location: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
