// ─── Payloads ────────────────────────────────────────────────────────────────

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

// ─── Responses ───────────────────────────────────────────────────────────────

export interface AuthResponse {
  _id: string;
  name: string;
  email: string;
  token: string;
  createdAt: string;
  updatedAt: string;
}

export type RegisterResponse = AuthResponse;
export type LoginResponse = AuthResponse;
export type GetMeResponse = AuthResponse;
