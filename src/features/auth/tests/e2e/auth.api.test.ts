// ============================================================================
// tests/e2e/auth.api.test.ts
// ============================================================================
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { createApp } from '@/app';
import { prisma } from '@/infrastructure/database';

describe('Auth API E2E Tests', () => {
  let app: any;

  beforeAll(async () => {
    app = createApp();

    if (!process.env.DATABASE_URL) return;

    // Clean database
    try {
      await prisma.refreshToken.deleteMany();
      await prisma.user.deleteMany();
    } catch (e) {
      console.warn('Could not clean database', e);
    }
  });

  afterAll(async () => {
    if (process.env.DATABASE_URL) {
      await prisma.$disconnect();
    }
  });

  describe('POST /api/v1/auth/register', () => {
    it('should register a new user', async () => {
      if (!process.env.DATABASE_URL) return;
      const response = await request(app).post('/api/v1/auth/register').send({
        email: 'newuser@example.com',
        name: 'New User',
        password: 'Password123!',
      });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.email).toBe('newuser@example.com');
    });

    it('should return 409 for duplicate email', async () => {
      await request(app).post('/api/v1/auth/register').send({
        email: 'duplicate@example.com',
        name: 'User',
        password: 'Password123!',
      });

      const response = await request(app).post('/api/v1/auth/register').send({
        email: 'duplicate@example.com',
        name: 'User 2',
        password: 'Password123!',
      });

      expect(response.status).toBe(409);
    });

    it('should return 400 for invalid email', async () => {
      const response = await request(app).post('/api/v1/auth/register').send({
        email: 'invalid-email',
        name: 'User',
        password: 'Password123!',
      });

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/v1/auth/login', () => {
    beforeAll(async () => {
      await request(app).post('/api/v1/auth/register').send({
        email: 'login@example.com',
        name: 'Login User',
        password: 'Password123!',
      });
    });

    it('should login with valid credentials', async () => {
      const response = await request(app).post('/api/v1/auth/login').send({
        email: 'login@example.com',
        password: 'Password123!',
      });

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty('accessToken');
      expect(response.body.data).toHaveProperty('refreshToken');
    });

    it('should return 401 for invalid password', async () => {
      const response = await request(app).post('/api/v1/auth/login').send({
        email: 'login@example.com',
        password: 'WrongPassword',
      });

      expect(response.status).toBe(401);
    });
  });
});
