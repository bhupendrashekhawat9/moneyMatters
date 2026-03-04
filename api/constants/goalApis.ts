export const GOAL_APIS = {
  CREATE: '/api/goals',
  GET_ALL: '/api/goals',
  UPDATE: (id: string) => `/api/goals/${id}`,
  DELETE: (id: string) => `/api/goals/${id}`,
  SUMMARY: (id: string) => `/api/goals/${id}/summary`,
  CONTRIBUTE: (id: string) => `/api/goals/${id}/contribute`,
};
