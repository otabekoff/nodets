// ============================================================================
// src/infrastructure/cache/cache.service.ts - Smart Cache Service
// ============================================================================
import { injectable } from 'inversify';
import type { ICacheService } from './cache.interface.js';
import { RedisCacheService } from './redis.cache.js';
import { MemoryCacheService } from './memory.cache.js';
import { redisClient } from './redis.client.js';

/**
 * Smart Cache Service
 * Uses Redis if available, falls back to memory cache
 */
@injectable()
export class CacheService implements ICacheService {
  private implementation: ICacheService;

  constructor() {
    this.implementation = redisClient
      ? new RedisCacheService()
      : new MemoryCacheService();
  }

  async get<T>(key: string): Promise<T | null> {
    return this.implementation.get<T>(key);
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    return this.implementation.set(key, value, ttl);
  }

  async delete(key: string): Promise<void> {
    return this.implementation.delete(key);
  }

  async clear(): Promise<void> {
    return this.implementation.clear();
  }

  async has(key: string): Promise<boolean> {
    return this.implementation.has(key);
  }

  async keys(pattern: string): Promise<string[]> {
    return this.implementation.keys(pattern);
  }
}
