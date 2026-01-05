// ============================================================================
// features/users/infrastructure/repositories/user.repository.ts
// ============================================================================
import { injectable } from 'inversify';
import { prisma } from '@infrastructure/database/index.js';
import type { FilterRecord } from '@core/interfaces/index.js';
import { User } from '../../domain/User.entity.js';
import { UserMapper, type PrismaUser } from '../mappers/user.mapper.js';

@injectable()
export class UserRepository {
  private mapper: UserMapper;

  constructor() {
    this.mapper = new UserMapper();
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    return user ? this.mapper.toDomain(user as PrismaUser) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    return user ? this.mapper.toDomain(user as PrismaUser) : null;
  }

  async findAll(filters?: FilterRecord): Promise<User[]> {
    // Use 'any' here as Prisma's 'where' clause type is internally
    // complex and generated based on the schema, but FilterRecord
    // provides the necessary clarity for the input.

    const users = filters
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await prisma.user.findMany({ where: filters as any })
      : await prisma.user.findMany();
    return users.map((user: PrismaUser) => this.mapper.toDomain(user));
  }

  async findActive(): Promise<User[]> {
    const users = await prisma.user.findMany({
      where: { isActive: true },
    });
    return users.map((user: PrismaUser) => this.mapper.toDomain(user));
  }

  async create(data: Partial<User>): Promise<User> {
    const persistence = this.mapper.toPersistence(data as User);
    const created = await prisma.user.create({ data: persistence });
    return this.mapper.toDomain(created as PrismaUser);
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    const updated = await prisma.user.update({
      where: { id },
      data: this.mapper.toPersistence(data as User),
    });
    return this.mapper.toDomain(updated as PrismaUser);
  }

  async delete(id: string): Promise<boolean> {
    await prisma.user.delete({ where: { id } });
    return true;
  }

  async exists(id: string): Promise<boolean> {
    const count = await prisma.user.count({ where: { id } });
    return count > 0;
  }
}
