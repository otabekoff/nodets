// ============================================================================
// core/middlewares/error.middleware.ts
// ============================================================================
import { Request, Response, NextFunction } from 'express';
import { AppError, ValidationError } from '@core/errors/index.js';
import { ILogger } from '@core/interfaces/index.js';

/**
 * Global Error Handler Middleware
 */
export class ErrorMiddleware {
  constructor(private logger: ILogger) {}

  handle = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    // Handle operational errors (known errors)
    if (err instanceof AppError && err.isOperational) {
      this.handleOperationalError(err, req, res);
      return;
    }

    // Handle validation errors
    if (err instanceof ValidationError) {
      this.handleValidationError(err, req, res);
      return;
    }

    // Handle unknown errors (programming errors)
    this.handleUnknownError(err, req, res);
  };

  private handleOperationalError(
    err: AppError,
    req: Request,
    res: Response
  ): void {
    this.logger.warn(`Operational error: ${err.message}`, {
      code: err.code,
      statusCode: err.statusCode,
      path: req.path,
      method: req.method,
    });

    res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
      },
      meta: {
        timestamp: new Date().toISOString(),
        path: req.path,
      },
    });
  }

  private handleValidationError(
    err: ValidationError,
    req: Request,
    res: Response
  ): void {
    this.logger.warn(`Validation error: ${err.message}`, {
      errors: err.errors,
      path: req.path,
    });

    res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
        details: err.errors,
      },
      meta: {
        timestamp: new Date().toISOString(),
        path: req.path,
      },
    });
  }

  private handleUnknownError(err: Error, req: Request, res: Response): void {
    this.logger.error(`Unknown error: ${err.message}`, {
      stack: err.stack,
      path: req.path,
      method: req.method,
    });

    // Don't expose internal error details in production
    const message =
      process.env.NODE_ENV === 'production'
        ? 'Internal server error'
        : err.message;

    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message,
      },
      meta: {
        timestamp: new Date().toISOString(),
        path: req.path,
      },
    });
  }
}