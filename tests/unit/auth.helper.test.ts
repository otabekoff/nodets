import { describe, it, expect } from 'vitest';
import jwt from 'jsonwebtoken';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  hashPassword,
  comparePassword,
  generatePasswordResetToken,
  verifyPasswordResetToken,
} from '../../src/core/utils/auth.helper.js';
import { AuthenticationError } from '../../src/core/errors/index.js';

describe('Auth Helper', () => {
  const payload = { id: '123', email: 'test@example.com', role: 'user' };

  describe('JWT Tokens', () => {
    it('should generate and verify an access token', () => {
      const token = generateAccessToken(payload);
      const decoded = verifyAccessToken(token);
      expect(decoded.id).toBe(payload.id);
      expect(decoded.email).toBe(payload.email);
    });

    it('should generate and verify a refresh token', () => {
      const token = generateRefreshToken(payload);
      const decoded = verifyRefreshToken(token);
      expect(decoded.id).toBe(payload.id);
      expect(decoded.email).toBe(payload.email);
    });

    it('should throw AuthenticationError for invalid access token', () => {
      expect(() => verifyAccessToken('invalid-token')).toThrow(AuthenticationError);
    });

    it('should throw AuthenticationError for invalid refresh token', () => {
      expect(() => verifyRefreshToken('invalid-token')).toThrow(AuthenticationError);
    });
  });

  describe('Password Hashing', () => {
    it('should hash and compare a password', async () => {
      const password = 'secure-password';
      const hash = await hashPassword(password);
      expect(hash).not.toBe(password);
      const isMatch = await comparePassword(password, hash);
      expect(isMatch).toBe(true);
    });

    it('should return false for incorrect password', async () => {
      const hash = await hashPassword('password123');
      const isMatch = await comparePassword('wrong-password', hash);
      expect(isMatch).toBe(false);
    });
  });

  describe('Password Reset Tokens', () => {
    it('should generate and verify a password reset token', () => {
      const userId = 'user-456';
      const token = generatePasswordResetToken(userId);
      const result = verifyPasswordResetToken(token);
      expect(result.userId).toBe(userId);
    });

    it('should throw AuthenticationError for invalid reset token', () => {
      expect(() => verifyPasswordResetToken('invalid-token')).toThrow(AuthenticationError);
    });

    it('should throw Error for wrong token type', () => {
      const token = jwt.sign(
        { userId: '123', type: 'not-reset' },
        'test-secret-key-that-is-at-least-32-chars-long',
      );
      expect(() => verifyPasswordResetToken(token)).toThrow(AuthenticationError);
    });
  });
});
