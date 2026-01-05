// ============================================================================
// src/core/utils/crypto.util.ts - Additional Crypto Utilities
// ============================================================================
import { randomBytes, createHash } from 'crypto';

/**
 * Generate random token
 */
export function generateRandomToken(length: number = 32): string {
  return randomBytes(length).toString('hex');
}

/**
 * Generate verification code (6 digits)
 */
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Hash string using SHA256
 */
export function hashString(str: string): string {
  return createHash('sha256').update(str).digest('hex');
}

/**
 * Generate API key
 */
export function generateApiKey(): string {
  const prefix = 'sk';
  const randomPart = randomBytes(24).toString('base64url');
  return `${prefix}_${randomPart}`;
}
