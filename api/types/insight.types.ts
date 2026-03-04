import { BudgetResponse } from './budget.types';

// ─── Query Params ─────────────────────────────────────────────────────────────

export interface MonthlySummaryQuery {
  profileId: string;
  /** 1–12 */
  month: number;
  year: number;
}

export interface CategoryDistributionQuery {
  profileId: string;
  /** 1–12 */
  month: number;
  year: number;
  /** default: expense */
  type?: 'income' | 'expense';
}

export interface BudgetHealthQuery {
  budgetId: string;
}

export interface DailyGuidanceQuery {
  profileId: string;
}

// ─── Responses ───────────────────────────────────────────────────────────────

export interface MonthlySummaryResponse {
  period: {
    startDate: string;
    endDate: string;
  };
  income: number;
  expense: number;
  savings: number;
  savingsRate: number;
  transactionCount: number;
}

export interface CategoryDistributionItem {
  categoryId: string;
  categoryName: string;
  categoryIcon: string;
  total: number;
  count: number;
  percentage: number;
}

export interface CategoryDistributionResponse {
  period: {
    startDate: string;
    endDate: string;
  };
  type: string;
  grandTotal: number;
  distribution: CategoryDistributionItem[];
}

export interface DailySpendingItem {
  _id: string;
  total: number;
}

export type BudgetHealthStatus = 'healthy' | 'warning' | 'at_risk' | 'over_budget';

export interface BudgetHealthResponse {
  budget: BudgetResponse;
  spent: number;
  remaining: number;
  percentUsed: number;
  status: BudgetHealthStatus;
  dailySpending: DailySpendingItem[];
  recommendation: string;
}

export interface DailyGuidanceItem {
  budgetName: string;
  dailyLimit: number;
  todaySpent: number;
  excess: number;
  suggestion: string;
}

export interface DailyGuidanceResponse {
  date: string;
  guidance: DailyGuidanceItem[];
}
