// ============================================================================
// features/auth/validators/auth.validators.ts
// ============================================================================
import { z } from 'zod';

export const emailValidator = z.string().email();

export const passwordValidator = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

export const strongPasswordValidator = passwordValidator.regex(
  /[!@#$%^&*]/,
  'Password must contain at least one special character',
);
