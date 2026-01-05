// ============================================================================
// api/index.ts
// ============================================================================
import type { Application } from 'express';
import routes from './routes/index.js';
import { setupSwagger } from '@core/config/swagger.config.js';
import { apiLimiter } from '@core/middlewares/rate-limit.middleware.js';

/**
 * Setup API routes and documentation
 */
export function setupAPI(app: Application): void {
  // Apply rate limiting to all API routes (except in tests)
  if (process.env.NODE_ENV !== 'test') {
    app.use('/api', apiLimiter);
  }

  // Mount API routes
  app.use('/api', routes);

  // Setup API documentation
  setupSwagger(app);
}
