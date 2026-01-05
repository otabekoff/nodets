import { describe, it, expect } from 'vitest';
import {
  AppError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  ServiceUnavailableError,
  DomainError,
  ExternalServiceError,
  DatabaseError,
} from '../../src/core/errors/index.js';

describe('Error Classes', () => {
  describe('AppError', () => {
    it('should create an AppError with default values', () => {
      const error = new AppError('test error');
      expect(error.message).toBe('test error');
      expect(error.statusCode).toBe(500);
      expect(error.code).toBe('INTERNAL_ERROR');
      expect(error.isOperational).toBe(true);
      expect(error.stack).toBeDefined();
    });

    it('should create an AppError with custom values', () => {
      const error = new AppError('custom error', 418, 'I_AM_A_TEAPOT', false);
      expect(error.statusCode).toBe(418);
      expect(error.code).toBe('I_AM_A_TEAPOT');
      expect(error.isOperational).toBe(false);
    });
  });

  describe('ValidationError', () => {
    it('should create a ValidationError', () => {
      const errors = { email: ['Invalid email'] };
      const error = new ValidationError('validation failed', errors);
      expect(error.statusCode).toBe(400);
      expect(error.code).toBe('VALIDATION_ERROR');
      expect(error.errors).toEqual(errors);
    });
  });

  describe('AuthenticationError', () => {
    it('should create an AuthenticationError', () => {
      const error = new AuthenticationError();
      expect(error.statusCode).toBe(401);
      expect(error.code).toBe('AUTHENTICATION_ERROR');
      expect(error.message).toBe('Authentication required');
    });
  });

  describe('AuthorizationError', () => {
    it('should create an AuthorizationError', () => {
      const error = new AuthorizationError();
      expect(error.statusCode).toBe(403);
      expect(error.code).toBe('AUTHORIZATION_ERROR');
      expect(error.message).toBe('Insufficient permissions');
    });
  });

  describe('NotFoundError', () => {
    it('should create a NotFoundError', () => {
      const error = new NotFoundError('User');
      expect(error.statusCode).toBe(404);
      expect(error.code).toBe('NOT_FOUND');
      expect(error.message).toBe('User not found');
    });

    it('should create a NotFoundError with default resource', () => {
      const error = new NotFoundError();
      expect(error.message).toBe('Resource not found');
    });
  });

  describe('ConflictError', () => {
    it('should create a ConflictError', () => {
      const error = new ConflictError('User already exists');
      expect(error.statusCode).toBe(409);
      expect(error.code).toBe('CONFLICT');
      expect(error.message).toBe('User already exists');
    });
  });

  describe('RateLimitError', () => {
    it('should create a RateLimitError', () => {
      const error = new RateLimitError();
      expect(error.statusCode).toBe(429);
      expect(error.code).toBe('RATE_LIMIT_EXCEEDED');
      expect(error.message).toBe('Too many requests');
    });
  });

  describe('ServiceUnavailableError', () => {
    it('should create a ServiceUnavailableError', () => {
      const error = new ServiceUnavailableError();
      expect(error.statusCode).toBe(503);
      expect(error.code).toBe('SERVICE_UNAVAILABLE');
      expect(error.message).toBe('Service temporarily unavailable');
    });
  });

  describe('DomainError', () => {
    it('should create a DomainError', () => {
      const error = new DomainError('Business rule violated');
      expect(error.statusCode).toBe(400);
      expect(error.code).toBe('DOMAIN_ERROR');
      expect(error.message).toBe('Business rule violated');
    });
  });

  describe('ExternalServiceError', () => {
    it('should create an ExternalServiceError', () => {
      const error = new ExternalServiceError('Stripe', 'Network failure');
      expect(error.statusCode).toBe(502);
      expect(error.code).toBe('EXTERNAL_SERVICE_ERROR');
      expect(error.message).toBe('External service error: Network failure');
      expect(error.serviceName).toBe('Stripe');
    });
  });

  describe('DatabaseError', () => {
    it('should create a DatabaseError', () => {
      const originalError = new Error('SQL error');
      const error = new DatabaseError('Database operation failed', originalError);
      expect(error.statusCode).toBe(500);
      expect(error.code).toBe('DATABASE_ERROR');
      expect(error.isOperational).toBe(false);
      expect(error.stack).toBe(originalError.stack);
    });

    it('should create a DatabaseError without original error', () => {
      const error = new DatabaseError('Database operation failed');
      expect(error.message).toBe('Database operation failed');
    });
  });
});
