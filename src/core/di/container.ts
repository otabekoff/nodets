import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './types.js';

// Core Services
import { Logger } from '@core/logger/Logger.js';
import { CacheService } from '@infrastructure/cache/cache.service.js';
import { EventEmitter } from '@core/events/EventEmitter.js';

// Feature: Auth
import { AuthService } from '@features/auth/application/services/auth.service.js';
import { AuthRepository } from '@features/auth/infrastructure/repositories/auth.repository.js';
import type { IAuthRepository } from '@features/auth/infrastructure/repositories/auth.repository.interface.js';
import { LoginUseCase } from '@features/auth/application/use-cases/LoginUseCase.js';
import { RegisterUseCase } from '@features/auth/application/use-cases/RegisterUseCase.js';
import { RefreshTokenUseCase } from '@features/auth/application/use-cases/RefreshTokenUseCase.js';
import { AuthController } from '@features/auth/presentation/controllers/auth.controller.js';

// Feature: Users
// import { UserService } from "@features/users/application/services/user.service.js"; // TODO: Create this file
import { UserRepository } from '@features/users/infrastructure/repositories/user.repository.js';
import type { IUserRepository } from '@features/users/infrastructure/repositories/user.repository.interface.js';
import { CreateUserUseCase } from '@features/users/application/use-cases/CreateUserUseCase.js';
import { GetUserUseCase } from '@features/users/application/use-cases/GetUserUseCase.js';
// import { UpdateUserUseCase } from "@features/users/application/use-cases/UpdateUserUseCase.js"; // TODO: Create
// import { DeleteUserUseCase } from "@features/users/application/use-cases/DeleteUserUseCase.js"; // TODO: Create
import { UserController } from '@features/users/presentation/controllers/user.controller.js';

// Version Strategies
import { AuthV1Strategy } from '@features/auth/application/strategies/auth.v1.strategy.js';
import { AuthV2Strategy } from '@features/auth/application/strategies/auth.v2.strategy.js';
import { UserV1Strategy } from '@features/users/application/strategies/user.v1.strategy.js';
import { UserV2Strategy } from '@features/users/application/strategies/user.v2.strategy.js';

/**
 * Main Dependency Injection Container
 *
 * This container manages all application dependencies using InversifyJS.
 * It follows the Inversion of Control (IoC) principle.
 */
class DIContainer {
  private static instance: Container;

  /**
   * Get or create the singleton container instance
   */
  static getInstance(): Container {
    if (!DIContainer.instance) {
      DIContainer.instance = new Container({
        defaultScope: 'Singleton',
      });
      DIContainer.registerDependencies();
    }
    return DIContainer.instance;
  }

  /**
   * Register all application dependencies
   */
  private static registerDependencies(): void {
    const container = DIContainer.instance;

    // Core Services
    container.bind<Logger>(TYPES.Logger).to(Logger).inSingletonScope();
    container.bind<CacheService>(TYPES.CacheService).to(CacheService).inSingletonScope();
    container.bind<EventEmitter>(TYPES.EventEmitter).to(EventEmitter).inSingletonScope();

    // Auth Module
    container.bind<IAuthRepository>(TYPES.AuthRepository).to(AuthRepository);
    container.bind<AuthService>(TYPES.AuthService).to(AuthService);
    container.bind<LoginUseCase>(TYPES.LoginUseCase).to(LoginUseCase);
    container.bind<RegisterUseCase>(TYPES.RegisterUseCase).to(RegisterUseCase);
    container.bind<RefreshTokenUseCase>(TYPES.RefreshTokenUseCase).to(RefreshTokenUseCase);
    container.bind<AuthController>(TYPES.AuthController).to(AuthController);

    // Auth Version Strategies
    container.bind(TYPES.AuthV1Strategy).to(AuthV1Strategy);
    container.bind(TYPES.AuthV2Strategy).to(AuthV2Strategy);

    // User Module
    container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
    // container.bind<UserService>(TYPES.UserService).to(UserService); // TODO: Create file
    container.bind<CreateUserUseCase>(TYPES.CreateUserUseCase).to(CreateUserUseCase);
    container.bind<GetUserUseCase>(TYPES.GetUserUseCase).to(GetUserUseCase);
    // container.bind<UpdateUserUseCase>(TYPES.UpdateUserUseCase).to(
    //   UpdateUserUseCase,
    // ); // TODO: Create
    // container.bind<DeleteUserUseCase>(TYPES.DeleteUserUseCase).to(
    //   DeleteUserUseCase,
    // ); // TODO: Create
    container.bind<UserController>(TYPES.UserController).to(UserController);

    // User Version Strategies
    container.bind(TYPES.UserV1Strategy).to(UserV1Strategy);
    container.bind(TYPES.UserV2Strategy).to(UserV2Strategy);
  }

  /**
   * Reset the container (useful for testing)
   */
  static reset(): void {
    if (DIContainer.instance) {
      DIContainer.instance.unbindAll();
    }
  }
}

// Export the container instance
export const container = DIContainer.getInstance();
export { DIContainer };
