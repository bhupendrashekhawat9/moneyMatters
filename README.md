# MoneyMatters - Personal Finance Management System

A multi-profile personal finance management platform that allows users to manage multiple financial spaces (Self, Family, Business, Trips, etc.) with isolated accounts, transactions, budgets, and financial goals.

## Features

- **Multi-Profile Support**: Manage separate financial spaces (Self, Family, Business, etc.)
- **Account Management**: Track bank, cash, and credit card accounts
- **Transaction Tracking**: Record income and expenses with categories
- **Budget Management**: Create flexible budgets with daily spending guidance
- **Goal Tracking**: Set and track savings goals with contributions
- **Smart Insights**: Get daily spend limits, budget health, and savings recommendations

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and configure your environment variables:
   ```bash
   cp .env.example .env
   ```
4. Update the `.env` file with your MongoDB URI and JWT secret

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/moneymatters |
| `JWT_SECRET` | Secret key for JWT | - |
| `JWT_EXPIRE` | JWT expiration time | 30d |

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Profiles
- `POST /api/profiles` - Create profile
- `GET /api/profiles` - Get all profiles
- `GET /api/profiles/:id` - Get single profile
- `PUT /api/profiles/:id` - Update profile
- `DELETE /api/profiles/:id` - Delete profile

### Accounts
- `POST /api/accounts` - Create account
- `GET /api/accounts?profileId=` - Get accounts for profile
- `PUT /api/accounts/:id` - Update account
- `DELETE /api/accounts/:id` - Delete account

### Categories
- `POST /api/categories` - Create category
- `GET /api/categories?profileId=` - Get categories for profile
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Transactions
- `POST /api/transactions` - Create transaction
- `GET /api/transactions?profileId=&from=&to=&category=` - Get transactions
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

### Budgets
- `POST /api/budgets` - Create budget
- `GET /api/budgets?profileId=` - Get budgets for profile
- `GET /api/budgets/:id/summary` - Get budget summary with calculations
- `PUT /api/budgets/:id` - Update budget
- `DELETE /api/budgets/:id` - Delete budget

### Goals
- `POST /api/goals` - Create goal
- `GET /api/goals?profileId=` - Get goals for profile
- `POST /api/goals/:id/contribute` - Contribute to goal
- `GET /api/goals/:id/summary` - Get goal summary
- `PUT /api/goals/:id` - Update goal
- `DELETE /api/goals/:id` - Delete goal

### Insights
- `GET /api/insights/monthly?profileId=&month=&year=` - Monthly summary
- `GET /api/insights/categories?profileId=&month=&year=` - Category distribution
- `GET /api/insights/budget-health?budgetId=` - Budget health check
- `GET /api/insights/daily-guidance?profileId=` - Daily spending guidance

### Health Check
- `GET /api/health` - API health status

## Project Structure

```
src/
├── config/         # Configuration files
│   ├── constants.js
│   └── db.js
├── controllers/    # Route handlers
├── middlewares/    # Auth, validation, error handling
├── models/         # Mongoose schemas
├── routes/         # API route definitions
├── app.js          # Express app setup
└── server.js       # Server entry point
```

## License

ISC
