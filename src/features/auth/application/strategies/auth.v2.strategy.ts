// ============================================================================
// features/auth/application/strategies/auth.v2.strategy.ts
// ============================================================================
import { injectable } from 'inversify';
import type { IVersionStrategy } from '@core/interfaces/index.js';

@injectable()
export class AuthV2Strategy implements IVersionStrategy {
  readonly version = 'v2';

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
      tokens: {
        access: data.accessToken,
        refresh: data.refreshToken,
        expiresIn: '7d',
      },
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role,
        profile: {
          displayName: data.user.name,
          initials: this.getInitials(data.user.name),
        },
      },
      metadata: {
        loginTime: new Date().toISOString(),
        ipAddress: null, // Would come from request
      },
    };
  }

  private getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }
}
