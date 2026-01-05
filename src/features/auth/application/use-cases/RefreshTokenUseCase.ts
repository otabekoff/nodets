// ============================================================================
// features/auth/application/use-cases/RefreshTokenUseCase.ts
// ============================================================================
import { inject, injectable } from 'inversify';
import type { IUseCase } from '@core/interfaces/index.js';
import { TYPES } from '@core/di/types.js';
import type { IAuthRepository } from '../../infrastructure/repositories/auth.repository.interface.js';
import { AuthenticationError } from '@core/errors/index.js';
import { generateAccessToken, verifyRefreshToken } from '@core/utils/auth.helper.js';

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

@injectable()
export class RefreshTokenUseCase implements IUseCase<RefreshTokenRequest, RefreshTokenResponse> {
  constructor(@inject(TYPES.AuthRepository) private authRepository: IAuthRepository) {}

  async execute(request: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    // Verify token
    const payload = verifyRefreshToken(request.refreshToken);

    // Check if token exists and is valid
    const token = await this.authRepository.findRefreshToken(request.refreshToken);

    if (!token || !token.isValid()) {
      throw new AuthenticationError('Invalid refresh token');
    }

    // Generate new access token
    const accessToken = generateAccessToken({
      id: payload.id,
      email: payload.email,
      role: payload.role,
    });

    return { accessToken };
  }
}
