export const TRANSACTION_APIS = {
  CREATE: '/api/transactions',
  GET_ALL: '/api/transactions',
  GET_BY_ID: (id: string) => `/api/transactions/${id}`,
  UPDATE: (id: string) => `/api/transactions/${id}`,
  DELETE: (id: string) => `/api/transactions/${id}`,
};
