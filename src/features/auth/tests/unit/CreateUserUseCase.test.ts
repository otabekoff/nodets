import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CreateUserUseCase } from '../../application/use-cases/CreateUserUseCase';
import { ConflictError } from '@core/errors';

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let mockRepository: any;

  beforeEach(() => {
    mockRepository = {
      findByEmail: vi.fn(),
      create: vi.fn(),
    };
    useCase = new CreateUserUseCase(mockRepository);
  });

  it('should create a new user', async () => {
    mockRepository.findByEmail.mockResolvedValue(null);
    mockRepository.create.mockResolvedValue({
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
    });

    const result = await useCase.execute({
      email: 'test@example.com',
      name: 'Test User',
      password: 'password123',
    });

    expect(result).toBeDefined();
    expect(result.email).toBe('test@example.com');
  });

  it('should throw ConflictError if user exists', async () => {
    mockRepository.findByEmail.mockResolvedValue({ id: '1' });

    await expect(
      useCase.execute({
        email: 'existing@example.com',
        name: 'Test',
        password: 'pass',
      })
    ).rejects.toThrow(ConflictError);
  });
});
