export const CATEGORY_APIS = {
  CREATE: '/api/categories',
  GET_ALL: '/api/categories',
  UPDATE: (id: string) => `/api/categories/${id}`,
  DELETE: (id: string) => `/api/categories/${id}`,
};
