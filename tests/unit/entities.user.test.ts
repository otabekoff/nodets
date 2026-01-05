import { describe, it, expect } from 'vitest';
import { User } from '../../src/features/users/domain/User.entity.js';
import { DomainError } from '../../src/core/errors/index.js';

describe('User Entity', () => {
  it('should create a valid User', () => {
    const user = new User('id-1', 'test@example.com', 'Test User', 'hashed-pass');
    expect(user.id).toBe('id-1');
    expect(user.email).toBe('test@example.com');
  });

  it('should throw DomainError for invalid email on creation', () => {
    expect(() => new User('id-1', 'invalid-email', 'Test User', 'pass')).toThrow(DomainError);
  });

  it('should throw DomainError for short name on creation', () => {
    expect(() => new User('id-1', 'test@example.com', 'A', 'pass')).toThrow(DomainError);
  });

  it('should update email', () => {
    const user = new User('id-1', 'test@example.com', 'Test User', 'pass');
    user.updateEmail('new@example.com');
    expect(user.email).toBe('new@example.com');
  });

  it('should throw DomainError when updating to invalid email', () => {
    const user = new User('id-1', 'test@example.com', 'Test User', 'pass');
    expect(() => user.updateEmail('invalid')).toThrow(DomainError);
  });

  it('should update name', () => {
    const user = new User('id-1', 'test@example.com', 'Test User', 'pass');
    user.updateName('New Name');
    expect(user.name).toBe('New Name');
  });

  it('should throw DomainError when updating to short name', () => {
    const user = new User('id-1', 'test@example.com', 'Test User', 'pass');
    expect(() => user.updateName('B')).toThrow(DomainError);
  });

  it('should deactivate and activate user', () => {
    const user = new User('id-1', 'test@example.com', 'Test User', 'pass');
    user.deactivate();
    expect(user.isActive).toBe(false);
    user.activate();
    expect(user.isActive).toBe(true);
  });
});
