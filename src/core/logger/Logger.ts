// ============================================================================
// core/logger/Logger.ts - Logger Implementation
// ============================================================================
import { injectable } from "inversify";
import pino from "pino";
import type { ILogger } from "@core/interfaces/index.js";
import { config } from "@core/config/index.js";

@injectable()
export class Logger implements ILogger {
  private logger: pino.Logger;

  constructor() {
    const loggerOptions: pino.LoggerOptions = {
      level: config.LOG_LEVEL,
    };

    // Only add transport in development mode
    if (config.NODE_ENV === "development") {
      loggerOptions.transport = {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
        },
      };
    }

    this.logger = pino(loggerOptions);
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
