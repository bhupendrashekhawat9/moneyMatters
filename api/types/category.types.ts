// ─── Enums ───────────────────────────────────────────────────────────────────

export type CategoryTransactionType = 'income' | 'expense';

// ─── Payloads ────────────────────────────────────────────────────────────────

export interface CreateCategoryPayload {
  profileId: string;
  name: string;
  type: CategoryTransactionType;
  icon?: string;
  parentId?: string | null;
}

export interface UpdateCategoryPayload {
  name?: string;
  icon?: string;
  type?: CategoryTransactionType;
}

// ─── Query Params ─────────────────────────────────────────────────────────────

export interface GetCategoriesQuery {
  profileId: string;
  type?: CategoryTransactionType;
}

// ─── Response ────────────────────────────────────────────────────────────────

export interface CategoryResponse {
  _id: string;
  name: string;
  icon: string;
  type: CategoryTransactionType;
  profileId: string | null;
  parentId: string | null;
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
}
