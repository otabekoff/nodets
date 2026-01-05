import { Logger } from './Logger.js';

/**
 * Pino Stream for HTTP Request Logging
 *
 * This can be used with Morgan or similar HTTP loggers
 * to integrate with Pino's structured logging
 */
export class LoggerStream {
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  /**
   * Write method called by HTTP loggers like Morgan
   */
  write(message: string): void {
    // Remove trailing newline from Morgan
    const cleanMessage = message.trim();

    if (cleanMessage) {
      this.logger.info(cleanMessage);
    }
  }

  /**
   * Get a writable stream for Morgan
   */
  getStream(): { write: (message: string) => void } {
    return {
      write: (message: string) => this.write(message),
    };
  }
}

/**
 * Factory function to create a logger stream
 */
export function createLoggerStream(logger: Logger): LoggerStream {
  return new LoggerStream(logger);
}
