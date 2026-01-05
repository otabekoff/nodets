// ============================================================================
// core/middlewares/version.middleware.ts
// ============================================================================
import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      apiVersion?: string;
    }
  }
}

/**
 * API Version Middleware
 * 
 * Extracts API version from URL, header, or query parameter
 * Priority: URL > Header > Query > Default (v1)
 */
export const versionMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Extract version from URL path (/api/v1/users)
  const pathVersion = req.path.match(/^\/(v\d+)/)?.[1];
  
  // Extract version from header (API-Version: v1)
  const headerVersion = req.headers['api-version'] as string;
  
  // Extract version from query parameter (?version=v1)
  const queryVersion = req.query.version as string;
  
  // Set version with priority
  req.apiVersion = pathVersion || headerVersion || queryVersion || 'v1';
  
  // Add version to response headers
  res.setHeader('API-Version', req.apiVersion);
  
  next();
};