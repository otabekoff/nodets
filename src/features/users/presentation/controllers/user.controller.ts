// ============================================================================
// features/users/presentation/controllers/user.controller.ts
// ============================================================================
import type { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';
import { TYPES } from '@core/di/types.js';
import { CreateUserUseCase } from '../../application/use-cases/CreateUserUseCase.js';
import { GetUserUseCase } from '../../application/use-cases/GetUserUseCase.js';
import { UserV1Strategy } from '../../application/strategies/user.v1.strategy.js';
import { UserV2Strategy } from '../../application/strategies/user.v2.strategy.js';
import { successResponse } from '@core/utils/response.util.js';

@injectable()
export class UserController {
  constructor(
    @inject(TYPES.CreateUserUseCase) private createUserUseCase: CreateUserUseCase,
    @inject(TYPES.GetUserUseCase) private getUserUseCase: GetUserUseCase,
    @inject(TYPES.UserV1Strategy) private v1Strategy: UserV1Strategy,
    @inject(TYPES.UserV2Strategy) private v2Strategy: UserV2Strategy,
  ) {}

  async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await this.createUserUseCase.execute(req.body);
      const strategy = this.getStrategy(req.apiVersion);
      const response = await strategy.execute(user);

      res.status(201).json(successResponse(response, 'User created successfully'));
    } catch (error) {
      next(error);
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await this.getUserUseCase.execute({ id: req.params.id! });
      const strategy = this.getStrategy(req.apiVersion);
      const response = await strategy.execute(user);

      res.json(successResponse(response));
    } catch (error) {
      next(error);
    }
  }

  private getStrategy(version?: string) {
    return version === 'v2' ? this.v2Strategy : this.v1Strategy;
  }
}
