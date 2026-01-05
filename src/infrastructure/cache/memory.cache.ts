// ============================================================================
// src/infrastructure/cache/memory.cache.ts - Fallback for no Redis
// ============================================================================
import { injectable } from 'inversify';
import type { ICacheService } from './cache.interface.js';

interface CacheItem {
  value: unknown;
  expiresAt: number;
}

@injectable()
export class MemoryCacheService implements ICacheService {
  private cache = new Map<string, CacheItem>();
  private defaultTTL = 3600000; // 1 hour in ms

  async get<T>(key: string): Promise<T | null> {
    const item = this.cache.get(key);

    if (!item) return null;

    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return item.value as T;
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    const ttlMs = ttl ? ttl * 1000 : this.defaultTTL;
    const expiresAt = Date.now() + ttlMs;

    this.cache.set(key, { value, expiresAt });
  }

  async delete(key: string): Promise<void> {
    this.cache.delete(key);
  }

  async clear(): Promise<void> {
    this.cache.clear();
  }

  async has(key: string): Promise<boolean> {
    const item = this.cache.get(key);

    if (!item) return false;

    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  async keys(pattern: string): Promise<string[]> {
    const regex = new RegExp(pattern.replace('*', '.*'));
    return Array.from(this.cache.keys()).filter((key) => regex.test(key));
  }
}
