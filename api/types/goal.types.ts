// ─── Enums ───────────────────────────────────────────────────────────────────

export type GoalStatus = 'active' | 'completed' | 'cancelled';
export type GoalContributionSource = 'manual' | 'excess_saving' | 'transfer';

// ─── Payloads ────────────────────────────────────────────────────────────────

export interface CreateGoalPayload {
  profileId: string;
  name: string;
  targetAmount: number;
  /** ISO date string e.g. 2026-12-31 */
  targetDate: string;
}

export interface UpdateGoalPayload {
  name?: string;
  targetAmount?: number;
  targetDate?: string;
  status?: GoalStatus;
}

export interface GoalContributionPayload {
  amount: number;
  source?: GoalContributionSource;
  note?: string;
}

// ─── Query Params ─────────────────────────────────────────────────────────────

export interface GetGoalsQuery {
  profileId: string;
  status?: GoalStatus;
}

// ─── Responses ───────────────────────────────────────────────────────────────

export interface GoalResponse {
  _id: string;
  profileId: string;
  name: string;
  targetAmount: number;
  targetDate: string;
  currentAmount: number;
  status: GoalStatus;
  createdAt: string;
  updatedAt: string;
}

export interface GoalContributionResponse {
  _id: string;
  goalId: string;
  profileId: string;
  amount: number;
  source: GoalContributionSource;
  date: string;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GoalSummary {
  remaining: number;
  /** percentage 0–100 */
  progress: number;
  monthsLeft: number;
  requiredPerMonth: number;
  onTrack: boolean;
}

export interface GoalSummaryResponse {
  goal: GoalResponse;
  contributions: GoalContributionResponse[];
  summary: GoalSummary;
}

export interface ContributeToGoalResponse {
  contribution: GoalContributionResponse;
  goal: GoalResponse;
}
