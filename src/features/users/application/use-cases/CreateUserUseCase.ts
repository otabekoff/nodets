// ============================================================================
// features/users/application/use-cases/CreateUserUseCase.ts
// ============================================================================
import { injectable, inject } from 'inversify';
import { IUseCase } from '@core/interfaces/index.js';
import { TYPES } from '@core/di/types.js';
import { IUserRepository } from '../../infrastructure/repositories/user.repository.interface.js';
import { User } from '../../domain/User.entity.js';
import { ConflictError } from '@core/errors/index.js';
import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';

export interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
  role?: string;
}

@injectable()
export class CreateUserUseCase implements IUseCase<CreateUserRequest, User> {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: IUserRepository
  ) {}

  async execute(request: CreateUserRequest): Promise<User> {
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(request.email);
    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(request.password, 10);

    // Create user entity
    const user = new User(
      nanoid(),
      request.email,
      request.name,
      hashedPassword,
      request.role || 'user'
    );

    // Persist to database
    return await this.userRepository.create(user);
  }
}
