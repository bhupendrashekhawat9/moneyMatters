import { Request } from 'express';
import { Document, Types } from 'mongoose';

// User interface
export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

// Profile interface
export interface IProfile extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId | IUser;
  name: string;
  type: 'self' | 'family' | 'wife' | 'business' | 'trip' | 'other';
  currency: string;
  defaultBudgetCycle: 'monthly' | 'weekly' | 'custom';
  monthStartDay: number;
  createdAt: Date;
  updatedAt: Date;
}

// Account interface
export interface IAccount extends Document {
  _id: Types.ObjectId;
  profileId: Types.ObjectId | IProfile;
  name: string;
  type: 'bank' | 'cash' | 'credit_card';
  openingBalance: number;
  currentBalance: number;
  createdAt: Date;
  updatedAt: Date;
}

// Category interface
export interface ICategory extends Document {
  _id: Types.ObjectId;
  name: string;
  icon: string;
  type: 'income' | 'expense';
  profileId: Types.ObjectId | IProfile | null;
  parentId: Types.ObjectId | ICategory | null;
  isSystem: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Transaction interface
export interface ITransaction extends Document {
  _id: Types.ObjectId;
  profileId: Types.ObjectId | IProfile;
  accountId: Types.ObjectId | IAccount;
  type: 'income' | 'expense';
  amount: number;
  categoryId: Types.ObjectId | ICategory;
  date: Date;
  note?: string;
  paymentMode: 'cash' | 'card' | 'upi' | 'bank_transfer' | 'other';
  isRecurring: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Budget interface
export interface IBudget extends Document {
  _id: Types.ObjectId;
  profileId: Types.ObjectId | IProfile;
  name: string;
  amount: number;
  startDate: Date;
  endDate: Date;
  type: 'overall' | 'category';
  categoryIds: Types.ObjectId[] | ICategory[];
  createdAt: Date;
  updatedAt: Date;
}

// Goal interface
export interface IGoal extends Document {
  _id: Types.ObjectId;
  profileId: Types.ObjectId | IProfile;
  name: string;
  targetAmount: number;
  targetDate: Date;
  currentAmount: number;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

// Goal Contribution interface
export interface IGoalContribution extends Document {
  _id: Types.ObjectId;
  goalId: Types.ObjectId | IGoal;
  profileId: Types.ObjectId | IProfile;
  amount: number;
  source: 'manual' | 'excess_saving' | 'transfer';
  date: Date;
  note?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Extended Request with user
export interface AuthRequest extends Request {
  user?: IUser;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: any[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
