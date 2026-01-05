// ============================================================================
// features/auth/__tests__/unit/LoginUseCase.test.ts
// ============================================================================
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoginUseCase } from '../../application/use-cases/LoginUseCase';
import { AuthenticationError } from '@core/errors';

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;
  let mockAuthRepository: any;

  beforeEach(() => {
    mockAuthRepository = {
      findUserByEmail: vi.fn(),
      saveRefreshToken: vi.fn(),
    };
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

    mockAuthRepository.findUserByEmail.mockResolvedValue(mockUser);
    mockAuthRepository.saveRefreshToken.mockResolvedValue({});

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
      })
    ).rejects.toThrow(AuthenticationError);
  });
});
