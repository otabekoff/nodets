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
      saveRefreshToken: vi.fn(),
      findUserById: vi.fn(), // Added missing methods to satisfy interface if needed
    } as unknown as Mocked<IAuthRepository>;
    useCase = new LoginUseCase(mockAuthRepository);
  });

  it('should login user with valid credentials', async () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      password: '$2b$10$hashedpassword',
      role: 'user',
    };

    mockAuthRepository.findUserByEmail.mockResolvedValue(mockUser as unknown as User);
    mockAuthRepository.saveRefreshToken.mockResolvedValue({} as unknown as RefreshToken);
    vi.mocked(bcrypt.compare).mockResolvedValue(true as never);

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
});
