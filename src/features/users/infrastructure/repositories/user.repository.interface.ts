// ============================================================================
// features/users/infrastructure/repositories/user.repository.interface.ts
// ============================================================================
import { IRepository } from '@core/interfaces/index.js';
import { User } from '../../domain/User.entity.js';

export interface IUserRepository extends IRepository<User, string> {
  findByEmail(email: string): Promise<User | null>;
  findActive(): Promise<User[]>;
}