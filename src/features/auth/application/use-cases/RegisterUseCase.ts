// ============================================================================
// features/auth/application/use-cases/RegisterUseCase.ts
// ============================================================================
import { injectable, inject } from 'inversify';
import type { IUseCase } from '@core/interfaces/index.js';
import { TYPES } from '@core/di/types.js';
import type { IAuthRepository } from '../../infrastructure/repositories/auth.repository.interface.js';
import { ConflictError } from '@core/errors/index.js';
import { hashPassword } from '@core/utils/auth.helper.js';
import { User } from '@features/users/domain/User.entity.js';
import { nanoid } from 'nanoid';

export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
}

@injectable()
export class RegisterUseCase implements IUseCase<RegisterRequest, User> {
  constructor(@inject(TYPES.AuthRepository) private authRepository: IAuthRepository) {}

  async execute(request: RegisterRequest): Promise<User> {
    // Check if user exists
    const existingUser = await this.authRepository.findUserByEmail(request.email);

    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await hashPassword(request.password);

    // Create user
    const user = new User(nanoid(), request.email, request.name, hashedPassword);

    return await this.authRepository.createUser(user);
  }
}
