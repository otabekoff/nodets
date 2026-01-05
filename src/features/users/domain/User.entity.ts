// ============================================================================
// features/users/domain/User.entity.ts
// ============================================================================
import { DomainError } from '@core/errors/index.js';

export class User {
  constructor(
    public readonly id: string,
    public email: string,
    public name: string,
    public password: string,
    public role: string = 'user',
    public isActive: boolean = true,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.email || !this.email.includes('@')) {
      throw new DomainError('Invalid email address');
    }
    if (!this.name || this.name.length < 2) {
      throw new DomainError('Name must be at least 2 characters');
    }
  }

  updateEmail(newEmail: string): void {
    if (!newEmail || !newEmail.includes('@')) {
      throw new DomainError('Invalid email address');
    }
    this.email = newEmail;
    this.updatedAt = new Date();
  }

  updateName(newName: string): void {
    if (!newName || newName.length < 2) {
      throw new DomainError('Name must be at least 2 characters');
    }
    this.name = newName;
    this.updatedAt = new Date();
  }

  deactivate(): void {
    this.isActive = false;
    this.updatedAt = new Date();
  }

  activate(): void {
    this.isActive = true;
    this.updatedAt = new Date();
  }
}