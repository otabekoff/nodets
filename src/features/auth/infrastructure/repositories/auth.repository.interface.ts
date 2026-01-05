// ============================================================================
// features/auth/infrastructure/repositories/auth.repository.interface.ts
// ============================================================================
import { RefreshToken } from '../../domain/Auth.entity.js';
import { User } from '@features/users/domain/User.entity.js';

export interface IAuthRepository {
  findUserByEmail(email: string): Promise<User | null>;
  createUser(data: Partial<User>): Promise<User>;
  saveRefreshToken(token: RefreshToken): Promise<RefreshToken>;
  findRefreshToken(token: string): Promise<RefreshToken | null>;
  revokeRefreshToken(token: string): Promise<void>;
  revokeAllUserTokens(userId: string): Promise<void>;
}
