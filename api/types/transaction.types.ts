// ─── Enums ───────────────────────────────────────────────────────────────────

export type TransactionEntryType = 'income' | 'expense';
export type PaymentMode = 'cash' | 'card' | 'upi' | 'bank_transfer' | 'other';

// ─── Payloads ────────────────────────────────────────────────────────────────

export interface CreateTransactionPayload {
  profileId: string;
  accountId: string;
  categoryId: string;
  type: TransactionEntryType;
  amount: number;
  /** ISO date-time string */
  date?: string;
  note?: string;
  paymentMode?: PaymentMode;
  isRecurring?: boolean;
}

export interface UpdateTransactionPayload {
  amount?: number;
  categoryId?: string;
  /** ISO date-time string */
  date?: string;
  note?: string;
  paymentMode?: PaymentMode;
}

// ─── Query Params ─────────────────────────────────────────────────────────────

export interface GetTransactionsQuery {
  profileId: string;
  /** ISO date string */
  from?: string;
  /** ISO date string */
  to?: string;
  category?: string;
  accountId?: string;
  type?: TransactionEntryType;
  /** default: 50 */
  limit?: number;
  /** default: 1 */
  page?: number;
}

// ─── Responses ───────────────────────────────────────────────────────────────

export interface TransactionResponse {
  _id: string;
  profileId: string;
  accountId: string;
  categoryId: string;
  type: TransactionEntryType;
  amount: number;
  date: string;
  note?: string;
  paymentMode: PaymentMode;
  isRecurring: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedTransactionsResponse {
  transactions: TransactionResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
