/**
 * Dependency Injection Type Symbols
 * 
 * These symbols are used to identify dependencies in the IoC container.
 * Using symbols prevents naming conflicts and provides type safety.
 */

export const TYPES = {
  // Core Services
  Logger: Symbol.for('Logger'),
  CacheService: Symbol.for('CacheService'),
  EventEmitter: Symbol.for('EventEmitter'),
  
  // Database
  PrismaClient: Symbol.for('PrismaClient'),
  MongoClient: Symbol.for('MongoClient'),
  
  // Auth Module
  AuthRepository: Symbol.for('AuthRepository'),
  AuthService: Symbol.for('AuthService'),
  AuthController: Symbol.for('AuthController'),
  LoginUseCase: Symbol.for('LoginUseCase'),
  RegisterUseCase: Symbol.for('RegisterUseCase'),
  RefreshTokenUseCase: Symbol.for('RefreshTokenUseCase'),
  LogoutUseCase: Symbol.for('LogoutUseCase'),
  
  // Auth Strategies
  AuthV1Strategy: Symbol.for('AuthV1Strategy'),
  AuthV2Strategy: Symbol.for('AuthV2Strategy'),
  
  // User Module
  UserRepository: Symbol.for('UserRepository'),
  UserService: Symbol.for('UserService'),
  UserController: Symbol.for('UserController'),
  CreateUserUseCase: Symbol.for('CreateUserUseCase'),
  GetUserUseCase: Symbol.for('GetUserUseCase'),
  UpdateUserUseCase: Symbol.for('UpdateUserUseCase'),
  DeleteUserUseCase: Symbol.for('DeleteUserUseCase'),
  ListUsersUseCase: Symbol.for('ListUsersUseCase'),
  
  // User Strategies
  UserV1Strategy: Symbol.for('UserV1Strategy'),
  UserV2Strategy: Symbol.for('UserV2Strategy'),
  
  // Product Module
  ProductRepository: Symbol.for('ProductRepository'),
  ProductService: Symbol.for('ProductService'),
  ProductController: Symbol.for('ProductController'),
  
  // Infrastructure Services
  EmailService: Symbol.for('EmailService'),
  StorageService: Symbol.for('StorageService'),
  QueueService: Symbol.for('QueueService'),
  SearchService: Symbol.for('SearchService'),
} as const;

export type TypesKey = keyof typeof TYPES;