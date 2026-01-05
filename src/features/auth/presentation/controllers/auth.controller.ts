// ============================================================================
// features/auth/presentation/controllers/auth.controller.ts
// ============================================================================
import type { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';
import { TYPES } from '@core/di/types.js';
import { LoginUseCase } from '../../application/use-cases/LoginUseCase.js';
import { RegisterUseCase } from '../../application/use-cases/RegisterUseCase.js';
import { RefreshTokenUseCase } from '../../application/use-cases/RefreshTokenUseCase.js';
import { AuthV1Strategy } from '../../application/strategies/auth.v1.strategy.js';
import { AuthV2Strategy } from '../../application/strategies/auth.v2.strategy.js';
import { successResponse } from '@core/utils/response.util.js';

@injectable()
export class AuthController {
  constructor(
    @inject(TYPES.LoginUseCase) private loginUseCase: LoginUseCase,
    @inject(TYPES.RegisterUseCase) private registerUseCase: RegisterUseCase,
    @inject(TYPES.RefreshTokenUseCase) private refreshTokenUseCase: RefreshTokenUseCase,
    @inject(TYPES.AuthV1Strategy) private v1Strategy: AuthV1Strategy,
    @inject(TYPES.AuthV2Strategy) private v2Strategy: AuthV2Strategy
  ) {}

  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await this.registerUseCase.execute(req.body);
      res.status(201).json(successResponse(user, 'User registered successfully'));
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.loginUseCase.execute(req.body);
      const strategy = this.getStrategy(req.apiVersion);
      const response = await strategy.execute(result);

      res.json(successResponse(response, 'Login successful'));
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.refreshTokenUseCase.execute(req.body);
      res.json(successResponse(result));
    } catch (error) {
      next(error);
    }
  }

  private getStrategy(version?: string) {
    return version === 'v2' ? this.v2Strategy : this.v1Strategy;
  }
}
