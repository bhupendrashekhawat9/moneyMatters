export const BUDGET_APIS = {
  CREATE: '/api/budgets',
  GET_ALL: '/api/budgets',
  UPDATE: (id: string) => `/api/budgets/${id}`,
  DELETE: (id: string) => `/api/budgets/${id}`,
  SUMMARY: (id: string) => `/api/budgets/${id}/summary`,
};
