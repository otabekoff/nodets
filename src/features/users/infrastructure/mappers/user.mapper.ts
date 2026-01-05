// ============================================================================
// features/users/infrastructure/mappers/user.mapper.ts
// ============================================================================
import { User } from '../../domain/User.entity.js';

export type PrismaUser = {
  id: string;
  email: string;
  name: string;
  password: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export class UserMapper {
  toDomain(persistence: PrismaUser): User {
    return new User(
      persistence.id,
      persistence.email,
      persistence.name,
      persistence.password,
      persistence.role,
      persistence.isActive,
      persistence.createdAt,
      persistence.updatedAt,
    );
  }

  toPersistence(domain: User): PrismaUser {
    return {
      id: domain.id,
      email: domain.email,
      name: domain.name,
      password: domain.password,
      role: domain.role,
      isActive: domain.isActive,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
}
