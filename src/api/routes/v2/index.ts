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

// Health check endpoint
router.get('/health', (req, res) => {
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