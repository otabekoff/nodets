// ============================================================================
// core/middlewares/request-logger.middleware.ts
// ============================================================================
import type { NextFunction, Request, Response } from 'express';
import type { ILogger } from '@core/interfaces/index.js';
import { nanoid } from 'nanoid';

declare global {
  namespace Express {
    interface Request {
      requestId: string;
    }
  }
}

/**
 * Request Logger Middleware
 */
export class RequestLoggerMiddleware {
  constructor(private logger: ILogger) {}

  log = (req: Request, res: Response, next: NextFunction): void => {
    // Generate unique request ID
    req.requestId = nanoid();

    // Log request
    const startTime = Date.now();

    this.logger.info('Incoming request', {
      requestId: req.requestId,
      method: req.method,
      path: req.path,
      query: req.query,
      ip: req.ip,
      userAgent: req.get('user-agent'),
    });

    // Log response
    res.on('finish', () => {
      const duration = Date.now() - startTime;

      this.logger.info('Request completed', {
        requestId: req.requestId,
        method: req.method,
        path: req.path,
        statusCode: res.statusCode,
        duration: `${duration}ms`,
      });
    });

    next();
  };
}
