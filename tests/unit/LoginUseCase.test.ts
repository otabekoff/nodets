// ============================================================================
// features/auth/__tests__/unit/LoginUseCase.test.ts
// ============================================================================
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoginUseCase } from '@features/auth/application/use-cases/LoginUseCase.js';
import type { IAuthRepository } from '@features/auth/infrastructure/repositories/auth.repository.interface.js';
import { AuthenticationError } from '@core/errors/index.js';
import bcrypt from 'bcrypt';
import { User } from '@features/users/domain/User.entity.js';
import { RefreshToken } from '@features/auth/domain/Auth.entity.js';

import type { Mocked } from 'vitest';

vi.mock('bcrypt');

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;
  let mockAuthRepository: Mocked<IAuthRepository>;

  beforeEach(() => {
    mockAuthRepository = {
      findUserByEmail: vi.fn(),
      findUserById: vi.fn(),
      createUser: vi.fn(),
      saveRefreshToken: vi.fn(),
      findRefreshToken: vi.fn(),
      revokeRefreshToken: vi.fn(),
      revokeAllUserTokens: vi.fn(),
    } as Mocked<IAuthRepository>;
    useCase = new LoginUseCase(mockAuthRepository);
  });

  it('should login user with valid credentials', async () => {
    const mockUser = new User(
      '1',
      'test@example.com',
      'Test User',
      '$2b$10$hashedpassword',
      'user',
      true,
      new Date(),
      new Date(),
    );

    const mockToken = new RefreshToken(
      '1',
      'valid_refresh_token_string',
      '1',
      new Date(Date.now() + 3600000),
      false,
      new Date(),
    );

    mockAuthRepository.findUserByEmail.mockResolvedValue(mockUser);
    mockAuthRepository.saveRefreshToken.mockResolvedValue(mockToken);
    vi.mocked(bcrypt.compare).mockImplementation(async () => true);

    // Note: You'd need to mock bcrypt.compare here
    const result = await useCase.execute({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(result).toHaveProperty('accessToken');
    expect(result).toHaveProperty('refreshToken');
    expect(result.user.email).toBe('test@example.com');
  });

  it('should throw AuthenticationError with invalid email', async () => {
    mockAuthRepository.findUserByEmail.mockResolvedValue(null);

    await expect(
      useCase.execute({
        email: 'wrong@example.com',
        password: 'password123',
      }),
    ).rejects.toThrow(AuthenticationError);
  });

  it('should throw AuthenticationError with invalid password', async () => {
    const mockUser = new User(
      '1',
      'test@example.com',
      'Test User',
      '$2b$10$hashedpassword',
      'user',
      true,
      new Date(),
      new Date(),
    );

    mockAuthRepository.findUserByEmail.mockResolvedValue(mockUser);
    vi.mocked(bcrypt.compare).mockImplementation(async () => false);

    await expect(
      useCase.execute({
        email: 'test@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toThrow(AuthenticationError);
  });
});
