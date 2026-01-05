// ============================================================================
// api/routes/v1/auth.routes.ts
// ============================================================================
import { Router } from 'express';
import { container } from '@core/di/container.js';
import { TYPES } from '@core/di/types.js';
import { AuthController } from '@features/auth/presentation/controllers/auth.controller.js';
import { asyncHandler } from '@core/middlewares/async-handler.middleware.js';
import { validate } from '@core/middlewares/validation.middleware.js';
import { authLimiter } from '@core/middlewares/rate-limit.middleware.js';
import { LoginDtoSchema, RegisterDtoSchema } from '@features/auth/presentation/dtos/index.js';
import { z } from 'zod';

const router = Router();
const authController = container.get<AuthController>(TYPES.AuthController);

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - name
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post(
  '/register',
  authLimiter,
  validate(z.object({ body: RegisterDtoSchema })),
  asyncHandler(authController.register.bind(authController))
);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post(
  '/login',
  authLimiter,
  validate(z.object({ body: LoginDtoSchema })),
  asyncHandler(authController.login.bind(authController))
);

export default router;