// ============================================================================
// api/routes/v2/index.ts
// ============================================================================
import { Router } from 'express';
import usersRoutes from './users.routes.js';

const router = Router();

/**
 * V2 API Routes
 */
router.use('/users', usersRoutes);

// Base route for v2
router.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Welcome to API v2 (Enhanced)',
    documentation: '/redoc',
    endpoints: {
      users: '/api/v2/users',
      health: '/api/v2/health',
    },
    features: ['enhanced-profiles', 'advanced-filtering'],
  });
});

// Health check endpoint
router.get('/health', (_req, res) => {
  res.json({
    success: true,
    data: {
      status: 'healthy',
      version: 'v2',
      timestamp: new Date().toISOString(),
      features: ['enhanced-profiles', 'advanced-filtering'],
    },
  });
});

export default router;
