// ============================================================================
// src/core/utils/auth.helper.ts - Authentication Utilities
// ============================================================================
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from '@core/config/index.js';
import { AuthenticationError } from '@core/errors/index.js';

/**
 * Token payload interface
 */
export interface TokenPayload {
  id: string;
  email: string;
  role: string;
}

/**
 * Generate access token
 */
export function generateAccessToken(payload: TokenPayload): string {
  return jwt.sign(
    payload,
    config.JWT_SECRET as jwt.Secret,
    {
      expiresIn: config.JWT_EXPIRES_IN,
    } as jwt.SignOptions,
  );
}

/**
 * Generate refresh token
 */
export function generateRefreshToken(payload: TokenPayload): string {
  return jwt.sign(
    payload,
    config.JWT_REFRESH_SECRET as jwt.Secret,
    {
      expiresIn: config.JWT_REFRESH_EXPIRES_IN,
    } as jwt.SignOptions,
  );
}

/**
 * Verify access token
 */
export function verifyAccessToken(token: string): TokenPayload {
  try {
    return jwt.verify(token, config.JWT_SECRET) as TokenPayload;
  } catch {
    throw new AuthenticationError('Invalid or expired token');
  }
}

/**
 * Verify refresh token
 */
export function verifyRefreshToken(token: string): TokenPayload {
  try {
    return jwt.verify(token, config.JWT_REFRESH_SECRET) as TokenPayload;
  } catch {
    throw new AuthenticationError('Invalid or expired refresh token');
  }
}

/**
 * Hash password
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

/**
 * Compare password with hash
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Generate password reset token
 */
export function generatePasswordResetToken(userId: string): string {
  return jwt.sign({ userId, type: 'password-reset' }, config.JWT_SECRET, {
    expiresIn: '1h',
  });
}

/**
 * Verify password reset token
 */
export function verifyPasswordResetToken(token: string): { userId: string } {
  try {
    const payload = jwt.verify(token, config.JWT_SECRET) as { userId: string; type: string };

    if (payload.type !== 'password-reset') {
      throw new Error('Invalid token type');
    }

    return { userId: payload.userId };
  } catch {
    throw new AuthenticationError('Invalid or expired reset token');
  }
}
