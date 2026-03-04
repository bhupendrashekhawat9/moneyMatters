export const ACCOUNT_APIS = {
  CREATE: '/api/accounts',
  GET_ALL: '/api/accounts',
  GET_BY_ID: (id: string) => `/api/accounts/${id}`,
  UPDATE: (id: string) => `/api/accounts/${id}`,
  DELETE: (id: string) => `/api/accounts/${id}`,
};
