// ============================================================================
// tests/setup.ts - Test Setup File
// ============================================================================
import { afterAll, beforeAll } from 'vitest';
import { prisma } from '../infrastructure/database/index.js';

beforeAll(async () => {
  // Skip DB setup if DATABASE_URL is not provided (convenience for local dev)
  if (!process.env.DATABASE_URL) {
    console.log('⚠️ Skipping DB setup: DATABASE_URL not set');
    return;
  }

  await prisma.$connect();
  console.log('✅ Test database connected');
});

afterAll(async () => {
  await prisma.$disconnect();
  console.log('✅ Test database disconnected');
});
