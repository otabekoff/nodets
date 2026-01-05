// ============================================================================
// features/auth/types/auth.types.ts
// ============================================================================
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface TokenPayload {
  id: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}
