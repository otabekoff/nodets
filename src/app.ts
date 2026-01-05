// ============================================================================
// src/app.ts - Express Application Configuration
// ============================================================================
// Express app setup
import 'reflect-metadata';
import express, { type Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import { container } from '@core/di/container.js';
import { TYPES } from '@core/di/types.js';
import { Logger } from '@core/logger/Logger.js';
import { ErrorMiddleware } from '@core/middlewares/error.middleware.js';
import { RequestLoggerMiddleware } from '@core/middlewares/request-logger.middleware.js';
import { setupAPI } from '@api/index.js';

/**
 * Create and configure Express application
 */
export function createApp(): Application {
  const app = express();
  const logger = container.get<Logger>(TYPES.Logger);

  // Security middleware
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:', 'https:'],
        },
      },
      crossOriginEmbedderPolicy: false,
    }),
  );

  // CORS configuration
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || '*',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'API-Version'],
    }),
  );

  // Compression middleware
  app.use(compression());

  // Body parsing middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Request logging middleware
  const requestLogger = new RequestLoggerMiddleware(logger);
  app.use(requestLogger.log);

  // Setup API routes
  setupAPI(app);

  // Global error handler (must be last)
  const errorMiddleware = new ErrorMiddleware(logger);
  app.use(errorMiddleware.handle);

  return app;
}
