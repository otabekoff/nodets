// ============================================================================
// api/routes/index.ts
// ============================================================================
// Main route aggregator
import { Router } from 'express';
import { versionMiddleware } from '@core/middlewares/version.middleware.js';
import v1Routes from './v1/index.js';
import v2Routes from './v2/index.js';

const router = Router();

// Apply version middleware to all routes
router.use(versionMiddleware);

/**
 * Mount versioned routes
 */
router.use('/v1', v1Routes);
router.use('/v2', v2Routes);

// Root health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      versions: ['v1', 'v2'],
    },
  });
});

// API documentation redirect
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to the API',
    documentation: {
      swagger: '/api-docs',
      redoc: '/redoc',
    },
    versions: {
      v1: '/api/v1',
      v2: '/api/v2',
    },
  });
});

export default router;