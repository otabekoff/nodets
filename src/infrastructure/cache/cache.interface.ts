// ============================================================================
// src/infrastructure/cache/cache.interface.ts
// ============================================================================
export interface ICacheService {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttl?: number): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
  has(key: string): Promise<boolean>;
  keys(pattern: string): Promise<string[]>;
}
