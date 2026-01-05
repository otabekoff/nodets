import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./src/tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'dist/', '**/*.test.ts', '**/*.spec.ts', '**/types/'],
    },
    include: ['**/*.test.ts'],
    exclude: ['node_modules/', 'dist/', '**/types/', '**/fixtures/'],
    env: {
      DATABASE_URL:
        process.env.DATABASE_URL ||
        'postgresql://postgres:postgres@localhost:5432/nodets?schema=public',
      JWT_SECRET: process.env.JWT_SECRET || 'test-secret-key-that-is-at-least-32-chars-long',
      JWT_REFRESH_SECRET:
        process.env.JWT_REFRESH_SECRET || 'test-refresh-secret-key-at-least-32-chars-long',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@core': path.resolve(__dirname, './src/core'),
      '@features': path.resolve(__dirname, './src/features'),
      '@domain': path.resolve(__dirname, './src/domain'),
      '@infrastructure': path.resolve(__dirname, './src/infrastructure'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@api': path.resolve(__dirname, './src/api'),
      '@tests': path.resolve(__dirname, './tests'),
    },
  },
});
