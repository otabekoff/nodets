// ============================================================================
// core/middlewares/validation.middleware.ts
// ============================================================================
import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { ValidationError } from '@core/errors/index.js';

/**
 * Validation Middleware Factory
 * 
 * Creates a middleware that validates request data using Zod schemas
 */
export const validate = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: Record<string, string[]> = {};
        
        error.errors.forEach((err) => {
          const path = err.path.join('.');
          if (!errors[path]) {
            errors[path] = [];
          }
          errors[path].push(err.message);
        });
        
        next(new ValidationError('Validation failed', errors));
      } else {
        next(error);
      }
    }
  };
};
