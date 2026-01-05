// ============================================================================
// src/core/types/environment.d.ts - Environment Variables (AMBIENT)
// ============================================================================
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PORT: string;
      DATABASE_URL: string;
      JWT_SECRET: string;
      JWT_EXPIRES_IN: string;
      JWT_REFRESH_SECRET: string;
      JWT_REFRESH_EXPIRES_IN: string;
      REDIS_HOST?: string;
      REDIS_PORT?: string;
      REDIS_PASSWORD?: string;
      CORS_ORIGIN: string;
      LOG_LEVEL: 'error' | 'warn' | 'info' | 'debug';
    }
  }
}

export {};
