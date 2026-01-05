// ============================================================================
// features/users/application/strategies/user.v1.strategy.ts
// ============================================================================
import { injectable } from 'inversify';
import { IVersionStrategy } from '@core/interfaces/index.js';
import { User } from '../../domain/User.entity.js';

interface UserV1Response {
  id: string;
  email: string;
  name: string;
  role: string;
}

@injectable()
export class UserV1Strategy implements IVersionStrategy<User> {
  readonly version = 'v1';

  async execute(user: User): Promise<UserV1Response> {
    return this.transform(user);
  }

  transform(user: User): UserV1Response {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }
}
