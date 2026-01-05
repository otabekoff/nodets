// ============================================================================
// features/users/application/use-cases/GetUserUseCase.ts
// ============================================================================
import { inject, injectable } from 'inversify';
import type { IUseCase } from '@core/interfaces/index.js';
import { TYPES } from '@core/di/types.js';
import type { IUserRepository } from '../../infrastructure/repositories/user.repository.interface.js';
import { User } from '../../domain/User.entity.js';
import { NotFoundError } from '@core/errors/index.js';

export interface GetUserRequest {
  id: string;
}

@injectable()
export class GetUserUseCase implements IUseCase<GetUserRequest, User> {
  constructor(@inject(TYPES.UserRepository) private userRepository: IUserRepository) {}

  async execute(request: GetUserRequest): Promise<User> {
    const user = await this.userRepository.findById(request.id);

    if (!user) {
      throw new NotFoundError('User');
    }

    return user;
  }
}
