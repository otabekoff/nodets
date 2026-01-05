// ============================================================================
// src/infrastructure/cache/redis.cache.ts
// ============================================================================
import { injectable } from 'inversify';
import type { ICacheService } from './cache.interface.js';
import { redisClient } from './redis.client.js';
import { Logger } from '@core/logger/Logger.js';

@injectable()
export class RedisCacheService implements ICacheService {
  private logger = new Logger();
  private defaultTTL = 3600; // 1 hour

  async get<T>(key: string): Promise<T | null> {
    if (!redisClient) return null;

    try {
      const value = await redisClient.get(key);

      if (!value) return null;

      return JSON.parse(value) as T;
    } catch (error) {
      this.logger.error(`Cache get error for key: ${key}`, error);
      return null;
    }
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    if (!redisClient) return;

    try {
      const serialized = JSON.stringify(value);
      const expiry = ttl || this.defaultTTL;

      await redisClient.setex(key, expiry, serialized);
    } catch (error) {
      this.logger.error(`Cache set error for key: ${key}`, error);
    }
  }

  async delete(key: string): Promise<void> {
    if (!redisClient) return;

    try {
      await redisClient.del(key);
    } catch (error) {
      this.logger.error(`Cache delete error for key: ${key}`, error);
    }
  }

  async clear(): Promise<void> {
    if (!redisClient) return;

    try {
      await redisClient.flushdb();
    } catch (error) {
      this.logger.error('Cache clear error', error);
    }
  }

  async has(key: string): Promise<boolean> {
    if (!redisClient) return false;

    try {
      const exists = await redisClient.exists(key);
      return exists === 1;
    } catch (error) {
      this.logger.error(`Cache has error for key: ${key}`, error);
      return false;
    }
  }

  async keys(pattern: string): Promise<string[]> {
    if (!redisClient) return [];

    try {
      return await redisClient.keys(pattern);
    } catch (error) {
      this.logger.error(`Cache keys error for pattern: ${pattern}`, error);
      return [];
    }
  }

  /**
   * Get multiple keys at once
   */
  async mget<T>(keys: string[]): Promise<(T | null)[]> {
    if (!redisClient) return keys.map(() => null);

    try {
      const values: (string | null)[] = await redisClient.mget(...keys);
      return values.map((v: string | null) => v ? JSON.parse(v) as T : null);
    } catch (error) {
      this.logger.error('Cache mget error', error);
      return keys.map(() => null);
    }
  }

  /**
   * Set multiple keys at once
   */
  async mset(items: Record<string, any>, ttl?: number): Promise<void> {
    if (!redisClient) return;

    try {
      const pipeline = redisClient.pipeline();
      const expiry = ttl || this.defaultTTL;

      Object.entries(items).forEach(([key, value]) => {
        const serialized = JSON.stringify(value);
        pipeline.setex(key, expiry, serialized);
      });

      await pipeline.exec();
    } catch (error) {
      this.logger.error('Cache mset error', error);
    }
  }

  /**
   * Increment a numeric value
   */
  async incr(key: string, amount: number = 1): Promise<number> {
    if (!redisClient) return 0;

    try {
      return await redisClient.incrby(key, amount);
    } catch (error) {
      this.logger.error(`Cache incr error for key: ${key}`, error);
      return 0;
    }
  }

  /**
   * Set with expiration at specific time
   */
  async setWithExpire(key: string, value: any, expiresAt: Date): Promise<void> {
    if (!redisClient) return;

    try {
      const serialized = JSON.stringify(value);
      const expiryTimestamp = Math.floor(expiresAt.getTime() / 1000);

      await redisClient.set(key, serialized, 'EXAT', expiryTimestamp);
    } catch (error) {
      this.logger.error(`Cache setWithExpire error for key: ${key}`, error);
    }
  }
}
