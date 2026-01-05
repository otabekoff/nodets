// ============================================================================
// core/middlewares/validation.middleware.ts
// ============================================================================
import type { NextFunction, Request, Response } from "express";
import { type ZodSchema, ZodError } from "zod";
import { ValidationError } from "@core/errors/index.js";

/**
 * Validation Middleware Factory
 *
 * Creates a middleware that validates request data using Zod schemas
 */
export const validate = (schema: ZodSchema) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
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

        error.issues.forEach((err) => {
          const path = err.path.join(".");
          if (!errors[path]) {
            errors[path] = [];
          }
          errors[path].push(err.message);
        });

        next(new ValidationError("Validation failed", errors));
      } else {
        next(error);
      }
    }
  };
};
