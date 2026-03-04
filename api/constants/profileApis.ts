export const PROFILE_APIS = {
  CREATE: '/api/profiles',
  GET_ALL: '/api/profiles',
  GET_BY_ID: (id: string) => `/api/profiles/${id}`,
  UPDATE: (id: string) => `/api/profiles/${id}`,
  DELETE: (id: string) => `/api/profiles/${id}`,
};
