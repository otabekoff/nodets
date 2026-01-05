// ============================================================================
// features/users/application/strategies/user.v2.strategy.ts
// ============================================================================
import { injectable } from 'inversify';
import type { IVersionStrategy } from '@core/interfaces/index.js';
import { User } from '../../domain/User.entity.js';

interface UserV2Response {
  id: string;
  email: string;
  name: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  profile: {
    displayName: string;
    status: string;
  };
}

@injectable()
export class UserV2Strategy implements IVersionStrategy<User> {
  readonly version = 'v2';

  async execute(user: User): Promise<UserV2Response> {
    return this.transform(user);
  }

  transform(user: User): UserV2Response {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      profile: {
        displayName: user.name,
        status: user.isActive ? 'active' : 'inactive',
      },
    };
  }
}
