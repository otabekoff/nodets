// ============================================================================
// core/logger/Logger.ts - Logger Implementation
// ============================================================================
import { injectable } from 'inversify';
import pino from 'pino';
import { ILogger } from '@core/interfaces/index.js';
import { config } from '@core/config/index.js';

@injectable()
export class Logger implements ILogger {
  private logger: pino.Logger;

  constructor() {
    this.logger = pino({
      level: config.LOG_LEVEL,
      transport: config.NODE_ENV === 'development' ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      } : undefined,
    });
  }

  info(message: string, meta?: any): void {
    this.logger.info(meta, message);
  }

  error(message: string, meta?: any): void {
    this.logger.error(meta, message);
  }

  warn(message: string, meta?: any): void {
    this.logger.warn(meta, message);
  }

  debug(message: string, meta?: any): void {
    this.logger.debug(meta, message);
  }
}
