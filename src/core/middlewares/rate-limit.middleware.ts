// ============================================================================
// core/middlewares/rate-limit.middleware.ts
// ============================================================================
import type { NextFunction, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import { RateLimitError } from '@core/errors/index.js';

/**
 * Rate Limiting Middleware Factory
 */
export const createRateLimiter = (options?: {
  windowMs?: number;
  max?: number;
  message?: string;
}) => {
  if (process.env.NODE_ENV === 'test') {
    return (_req: Request, _res: Response, next: NextFunction) => next();
  }

  return rateLimit({
    windowMs: options?.windowMs || 15 * 60 * 1000, // 15 minutes
    max: options?.max || 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    handler: (_req, _res) => {
      throw new RateLimitError(options?.message || 'Too many requests, please try again later');
    },
  });
};

// Predefined rate limiters
export const authLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts, please try again later',
});

export const apiLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
