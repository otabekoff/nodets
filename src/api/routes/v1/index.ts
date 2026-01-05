// ============================================================================
// api/routes/v1/index.ts
// ============================================================================
// V1 route aggregator
import { Router } from 'express';
import usersRoutes from './users.routes.js';
import authRoutes from './auth.routes.js';

const router = Router();

/**
 * V1 API Routes
 */
router.use('/users', usersRoutes);
router.use('/auth', authRoutes);

// Base route for v1
router.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Welcome to API v1',
    documentation: '/api-docs',
    endpoints: {
      users: '/api/v1/users',
      auth: '/api/v1/auth',
      health: '/api/v1/health',
    },
  });
});

// Health check endpoint
router.get('/health', (_req, res) => {
  res.json({
    success: true,
    data: {
      status: 'healthy',
      version: 'v1',
      timestamp: new Date().toISOString(),
    },
  });
});

export default router;
