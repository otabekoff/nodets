// ============================================================================
// features/auth/application/use-cases/LoginUseCase.ts
// ============================================================================
import { injectable, inject } from 'inversify';
import type { IUseCase } from '@core/interfaces/index.js';
import { TYPES } from '@core/di/types.js';
import type { IAuthRepository } from '../../infrastructure/repositories/auth.repository.interface.js';
import { AuthenticationError } from '@core/errors/index.js';
import {
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
} from '@core/utils/auth.helper.js';
import { RefreshToken } from '../../domain/Auth.entity.js';
import { nanoid } from 'nanoid';
import { addDaysFromNow } from '@core/utils/date.util.js';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

@injectable()
export class LoginUseCase implements IUseCase<LoginRequest, LoginResponse> {
  constructor(@inject(TYPES.AuthRepository) private authRepository: IAuthRepository) {}

  async execute(request: LoginRequest): Promise<LoginResponse> {
    // Find user
    const user = await this.authRepository.findUserByEmail(request.email);

    if (!user) {
      throw new AuthenticationError('Invalid credentials');
    }

    // Verify password
    const isValidPassword = await comparePassword(request.password, user.password);

    if (!isValidPassword) {
      throw new AuthenticationError('Invalid credentials');
    }

    // Generate tokens
    const tokenPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshTokenString = generateRefreshToken(tokenPayload);

    // Save refresh token
    const refreshToken = new RefreshToken(
      nanoid(),
      refreshTokenString,
      user.id,
      addDaysFromNow(30),
    );

    await this.authRepository.saveRefreshToken(refreshToken);

    return {
      accessToken,
      refreshToken: refreshTokenString,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }
}
