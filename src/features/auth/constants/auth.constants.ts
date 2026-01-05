// ============================================================================
// features/auth/constants/auth.constants.ts
// ============================================================================
export const AUTH_CONSTANTS = {
  TOKEN: {
    ACCESS_EXPIRY: '7d',
    REFRESH_EXPIRY: '30d',
    RESET_EXPIRY: '1h',
  },
  BCRYPT: {
    SALT_ROUNDS: 10,
  },
  ATTEMPTS: {
    MAX_LOGIN_ATTEMPTS: 5,
    LOCKOUT_DURATION_MINUTES: 15,
  },
} as const;
