// ─── Enums ───────────────────────────────────────────────────────────────────

export type ProfileType = 'self' | 'family' | 'wife' | 'business' | 'trip' | 'other';
export type BudgetCycle = 'monthly' | 'weekly' | 'custom';

// ─── Payloads ────────────────────────────────────────────────────────────────

export interface CreateProfilePayload {
  name: string;
  type?: ProfileType;
  currency?: string;
  defaultBudgetCycle?: BudgetCycle;
  /** 1–28 */
  monthStartDay?: number;
}

export interface UpdateProfilePayload {
  name?: string;
  type?: ProfileType;
  currency?: string;
  defaultBudgetCycle?: BudgetCycle;
  monthStartDay?: number;
}

// ─── Response ────────────────────────────────────────────────────────────────

export interface ProfileResponse {
  _id: string;
  userId: string;
  name: string;
  type: ProfileType;
  currency: string;
  defaultBudgetCycle: BudgetCycle;
  monthStartDay: number;
  createdAt: string;
  updatedAt: string;
}
