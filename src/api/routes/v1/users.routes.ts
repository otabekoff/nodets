// ============================================================================
// api/routes/v1/users.routes.ts
// ============================================================================
import { Router } from 'express';
import { container } from '@core/di/container.js';
import { TYPES } from '@core/di/types.js';
import { UserController } from '@features/users/presentation/controllers/user.controller.js';
import { asyncHandler } from '@core/middlewares/async-handler.middleware.js';
import { validate } from '@core/middlewares/validation.middleware.js';
import { authenticate, authorize } from '@core/middlewares/auth.middleware.js';
import { CreateUserDtoSchema } from '@features/users/presentation/dtos/create-user.dto.js';
import { z } from 'zod';

const router = Router();
const userController = container.get<UserController>(TYPES.UserController);

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
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
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: User already exists
 */
router.post(
  '/',
  authenticate,
  authorize('admin'),
  validate(z.object({ body: CreateUserDtoSchema })),
  asyncHandler(userController.createUser.bind(userController)),
);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
router.get('/:id', authenticate, asyncHandler(userController.getUser.bind(userController)));

export default router;
