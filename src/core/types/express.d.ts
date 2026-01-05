// ============================================================================
// src/core/types/express.d.ts - Express Type Extensions (AMBIENT)
// ============================================================================
import { User } from '@features/users/domain/User.entity.js';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
      };
      apiVersion?: string;
      requestId: string;
    }
  }
}

export {};
