// ─── Enums ───────────────────────────────────────────────────────────────────

export type AccountType = 'bank' | 'cash' | 'credit_card';

// ─── Payloads ────────────────────────────────────────────────────────────────

export interface CreateAccountPayload {
  profileId: string;
  name: string;
  type: AccountType;
  openingBalance?: number;
}

export interface UpdateAccountPayload {
  name?: string;
  type?: AccountType;
}

// ─── Query Params ─────────────────────────────────────────────────────────────

export interface GetAccountsQuery {
  profileId: string;
}

// ─── Response ────────────────────────────────────────────────────────────────

export interface AccountResponse {
  _id: string;
  profileId: string;
  name: string;
  type: AccountType;
  openingBalance: number;
  currentBalance: number;
  createdAt: string;
  updatedAt: string;
}
