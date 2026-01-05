// ============================================================================
// src/infrastructure/cache/redis.client.ts
// ============================================================================
import { Redis as IORedis, Redis as RedisType, type RedisOptions } from "ioredis";
import { Logger } from "@core/logger/Logger.js";
import { config } from "@core/config/index.js";

/**
 * Redis Client Singleton
 */
class RedisClientSingleton {
  private static instance: RedisType | null = null;
  private static logger = new Logger();
  private static retryCount = 0;
  private static maxRetries = 3;

  static getInstance(): RedisType | null {
    if (!config.REDIS_HOST) {
      RedisClientSingleton.logger.warn(
        "Redis not configured, using memory cache",
      );
      return null;
    }

    if (!RedisClientSingleton.instance) {
      try {
        const options: RedisOptions = {
          host: config.REDIS_HOST,
          port: config.REDIS_PORT || 6379,
          retryStrategy: (times: number) => {
            // Stop retrying after max attempts
            if (times > RedisClientSingleton.maxRetries) {
              RedisClientSingleton.logger.warn(
                "⚠️  Redis unavailable - using memory cache"
              );
              return null; // Stop retrying
            }
            return Math.min(times * 100, 1000);
          },
          maxRetriesPerRequest: 3,
          lazyConnect: true, // Don't connect until first command
        };

        if (config.REDIS_PASSWORD !== undefined) {
          // assign only when defined to satisfy exactOptionalPropertyTypes
          (options as RedisOptions & { password: string }).password =
            config.REDIS_PASSWORD;
        }

        RedisClientSingleton.instance = new IORedis(options);

        // Event handlers - only log first error
        let hasLoggedError = false;

        RedisClientSingleton.instance!.on("connect", () => {
          RedisClientSingleton.logger.info("✅ Redis connected");
          hasLoggedError = false;
        });

        RedisClientSingleton.instance!.on("error", (error) => {
          if (!hasLoggedError) {
            RedisClientSingleton.logger.debug("Redis connection failed, using memory cache");
            hasLoggedError = true;
          }
        });

        RedisClientSingleton.instance!.on("close", () => {
          // Silently handle close
        });

        RedisClientSingleton.instance!.on("reconnecting", () => {
          // Silently handle reconnecting
        });

        // Attempt connection
        RedisClientSingleton.instance.connect().catch(() => {
          // Silently fail - will use memory cache
        });
      } catch (error) {
        RedisClientSingleton.logger.debug(
          "Failed to create Redis client, using memory cache"
        );
        return null;
      }
    }

    return RedisClientSingleton.instance;
  }

  static async disconnect(): Promise<void> {
    if (RedisClientSingleton.instance) {
      await RedisClientSingleton.instance.quit();
      RedisClientSingleton.instance = null;
    }
  }
}

export const redisClient = RedisClientSingleton.getInstance();
