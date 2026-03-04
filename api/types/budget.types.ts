// ─── Enums ───────────────────────────────────────────────────────────────────

export type BudgetType = 'overall' | 'category';

// ─── Payloads ────────────────────────────────────────────────────────────────

export interface CreateBudgetPayload {
  profileId: string;
  name: string;
  amount: number;
  /** ISO date string e.g. 2026-01-01 */
  startDate: string;
  /** ISO date string e.g. 2026-01-31 */
  endDate: string;
  type?: BudgetType;
  categoryIds?: string[];
}

export interface UpdateBudgetPayload {
  name?: string;
  amount?: number;
  startDate?: string;
  endDate?: string;
  categoryIds?: string[];
}

// ─── Query Params ─────────────────────────────────────────────────────────────

export interface GetBudgetsQuery {
  profileId: string;
}

// ─── Responses ───────────────────────────────────────────────────────────────

export interface BudgetResponse {
  _id: string;
  profileId: string;
  name: string;
  amount: number;
  startDate: string;
  endDate: string;
  type: BudgetType;
  categoryIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface BudgetSummary {
  spent: number;
  remaining: number;
  percentUsed: number;
  dailyLimit: number;
  daysLeft: number;
  forecastSpend: number;
  willOverrun: boolean;
}

export interface BudgetSummaryResponse {
  budget: BudgetResponse;
  summary: BudgetSummary;
}
