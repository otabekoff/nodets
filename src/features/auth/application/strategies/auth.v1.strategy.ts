// ============================================================================
// features/auth/application/strategies/auth.v1.strategy.ts
// ============================================================================
import { injectable } from 'inversify';
import type { IVersionStrategy } from '@core/interfaces/index.js';

export interface AuthResponseV1 {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

@injectable()
export class AuthV1Strategy implements IVersionStrategy {
  readonly version = 'v1';

  async execute(data: {
    accessToken: string;
    refreshToken: string;
    user: { id: string; email: string; name: string; role: string };
  }): Promise<AuthResponseV1> {
    return this.transform(data);
  }

  transform(data: {
    accessToken: string;
    refreshToken: string;
    user: { id: string; email: string; name: string; role: string };
  }): AuthResponseV1 {
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
