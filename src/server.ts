// ============================================================================
// src/server.ts - Server Entry Point
// ============================================================================
import 'reflect-metadata';
import { createApp } from './app.js';
import { config } from '@core/config/index.js';
import { container } from '@core/di/container.js';
import { TYPES } from '@core/di/types.js';
import { Logger } from '@core/logger/Logger.js';
import { PrismaClient } from '@prisma/client';

/**
 * Server class to manage application lifecycle
 */
class Server {
  private app = createApp();
  private logger = container.get<Logger>(TYPES.Logger);
  private prisma = new PrismaClient();

  /**
   * Start the server
   */
  async start(): Promise<void> {
    try {
      // Connect to database
      await this.connectDatabase();

      // Start HTTP server
      const port = config.port || 3000;
      this.app.listen(port, () => {
        this.logger.info(`🚀 Server running on port ${port}`);
        this.logger.info(`📚 API Documentation: http://localhost:${port}/api-docs`);
        this.logger.info(`📖 ReDoc: http://localhost:${port}/redoc`);
        this.logger.info(`🔥 Environment: ${config.nodeEnv}`);
        this.logger.info(`✨ API v1: http://localhost:${port}/api/v1`);
        this.logger.info(`✨ API v2: http://localhost:${port}/api/v2`);
      });

      // Setup graceful shutdown
      this.setupGracefulShutdown();
    } catch (error) {
      this.logger.error('Failed to start server', error);
      process.exit(1);
    }
  }

  /**
   * Connect to database
   */
  private async connectDatabase(): Promise<void> {
    try {
      await this.prisma.$connect();
      this.logger.info('✅ Database connected successfully');
    } catch (error) {
      this.logger.error('❌ Database connection failed', error);
      throw error;
    }
  }

  /**
   * Graceful shutdown handler
   */
  private setupGracefulShutdown(): void {
    const shutdown = async (signal: string) => {
      this.logger.info(`${signal} received. Starting graceful shutdown...`);

      try {
        // Disconnect from database
        await this.prisma.$disconnect();
        this.logger.info('Database disconnected');

        // Exit process
        process.exit(0);
      } catch (error) {
        this.logger.error('Error during shutdown', error);
        process.exit(1);
      }
    };

    // Listen for termination signals
    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

    // Handle uncaught errors
    process.on('uncaughtException', (error) => {
      this.logger.error('Uncaught Exception', error);
      process.exit(1);
    });

    process.on('unhandledRejection', (reason) => {
      this.logger.error('Unhandled Rejection', reason);
      process.exit(1);
    });
  }
}

// Start the server
const server = new Server();
server.start();
