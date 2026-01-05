// ============================================================================
// features/auth/application/strategies/auth.v1.strategy.ts
// ============================================================================
import { injectable } from 'inversify';
import type { IVersionStrategy } from '@core/interfaces/index.js';

@injectable()
export class AuthV1Strategy implements IVersionStrategy {
  readonly version = 'v1';

  async execute(data: {
    accessToken: string;
    refreshToken: string;
    user: { id: string; email: string; name: string; role: string };
  }): Promise<unknown> {
    return this.transform(data);
  }

  transform(data: {
    accessToken: string;
    refreshToken: string;
    user: { id: string; email: string; name: string; role: string };
  }): unknown {
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
