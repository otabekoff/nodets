import type { NextFunction, Request, Response } from 'express';

/**
 * Base Repository Interface
 *
 * Generic repository interface that all repositories should implement.
 * Follows the Repository pattern from DDD.
 */
export interface IRepository<T, ID = string> {
  findById(id: ID): Promise<T | null>;
  findAll(filters?: Record<string, any>): Promise<T[]>;
  create(data: Partial<T>): Promise<T>;
  update(id: ID, data: Partial<T>): Promise<T | null>;
  delete(id: ID): Promise<boolean>;
  exists(id: ID): Promise<boolean>;
}

/**
 * Base Service Interface
 */
export interface IService<T, CreateDTO, UpdateDTO, ID = string> {
  getById(id: ID): Promise<T | null>;
  getAll(filters?: Record<string, any>): Promise<T[]>;
  create(data: CreateDTO): Promise<T>;
  update(id: ID, data: UpdateDTO): Promise<T | null>;
  delete(id: ID): Promise<boolean>;
}

/**
 * Base Controller Interface
 */
export interface IController {
  handleRequest(req: Request, res: Response, next: NextFunction): Promise<void>;
}

/**
 * Version Strategy Interface
 *
 * Used for implementing version-specific behavior without duplicating code.
 * Each version implements this interface with its own logic.
 */
export interface IVersionStrategy<T = any> {
  readonly version: string;
  execute(context: T): Promise<any>;
  transform?(data: any): any;
  validate?(data: any): boolean;
}

/**
 * Use Case Interface
 *
 * Represents a single use case (user story) in the application.
 * Follows the Use Case pattern from Clean Architecture.
 */
export interface IUseCase<TRequest, TResponse> {
  execute(request: TRequest): Promise<TResponse>;
}

/**
 * Event Handler Interface
 */
export interface IEventHandler<T = any> {
  handle(event: T): Promise<void>;
}

/**
 * Domain Event Interface
 */
export interface IDomainEvent {
  readonly eventName: string;
  readonly occurredAt: Date;
  readonly aggregateId: string;
}

/**
 * Pagination Interface
 */
export interface IPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * Paginated Response Interface
 */
export interface IPaginatedResponse<T> {
  data: T[];
  pagination: IPagination;
}

/**
 * API Response Interface
 */
export interface IApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    timestamp: string;
    requestId: string;
    version: string;
  };
}

/**
 * Cache Service Interface
 */
export interface ICacheService {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttl?: number): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
  has(key: string): Promise<boolean>;
}

/**
 * Logger Interface
 */
export interface ILogger {
  info(message: string, meta?: any): void;
  error(message: string, meta?: any): void;
  warn(message: string, meta?: any): void;
  debug(message: string, meta?: any): void;
}

/**
 * Mapper Interface
 *
 * Used for transforming between different representations of data
 * (e.g., Domain Entity <-> Database Model <-> DTO)
 */
export interface IMapper<TDomain, TPersistence> {
  toDomain(persistence: TPersistence): TDomain;
  toPersistence(domain: TDomain): TPersistence;
}

/**
 * Specification Interface (for business rules)
 */
export interface ISpecification<T> {
  isSatisfiedBy(candidate: T): boolean;
  and(other: ISpecification<T>): ISpecification<T>;
  or(other: ISpecification<T>): ISpecification<T>;
  not(): ISpecification<T>;
}
