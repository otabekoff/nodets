// ============================================================================
// features/auth/domain/Auth.entity.ts
// ============================================================================
import { DomainError } from '@core/errors/index.js';

export class RefreshToken {
  constructor(
    public readonly id: string,
    public readonly token: string,
    public readonly userId: string,
    public expiresAt: Date,
    public isRevoked: boolean = false,
    public createdAt: Date = new Date()
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.token || this.token.length < 10) {
      throw new DomainError('Invalid token');
    }
    if (this.expiresAt < new Date()) {
      throw new DomainError('Token is expired');
    }
  }

  revoke(): void {
    this.isRevoked = true;
  }

  isValid(): boolean {
    return !this.isRevoked && this.expiresAt > new Date();
  }
}
