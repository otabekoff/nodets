// ============================================================================
// api/index.ts
// ============================================================================
import { Application } from 'express';
import routes from './routes/index.js';
import { setupSwagger } from '@core/config/swagger.config.js';
import { apiLimiter } from '@core/middlewares/rate-limit.middleware.js';

/**
 * Setup API routes and documentation
 */
export function setupAPI(app: Application): void {
  // Apply rate limiting to all API routes
  app.use('/api', apiLimiter);

  // Mount API routes
  app.use('/api', routes);

  // Setup API documentation
  setupSwagger(app);

  // 404 handler for API routes
  app.use('/api/*', (req, res) => {
    res.status(404).json({
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: 'The requested API endpoint does not exist',
      },
      meta: {
        timestamp: new Date().toISOString(),
        path: req.path,
      },
    });
  });
}
