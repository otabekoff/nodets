// ============================================================================
// features/auth/application/strategies/auth.v1.strategy.ts
// ============================================================================
import { injectable } from 'inversify';
import type { IVersionStrategy } from '@core/interfaces/index.js';

@injectable()
export class AuthV1Strategy implements IVersionStrategy {
  readonly version = 'v1';

  async execute(data: any): Promise<any> {
    return this.transform(data);
  }

  transform(data: any): any {
    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
      },
    };
  }
}
