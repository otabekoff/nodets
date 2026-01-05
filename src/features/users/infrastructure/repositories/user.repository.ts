// ============================================================================
// features/users/infrastructure/repositories/user.repository.ts
// ============================================================================
import { injectable } from 'inversify';
import { prisma } from '@infrastructure/database/index.js';
import { User } from '../../domain/User.entity.js';
import { UserMapper } from '../mappers/user.mapper.js';

@injectable()
export class UserRepository {
  private mapper: UserMapper;

  constructor() {
    this.mapper = new UserMapper();
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    return user ? this.mapper.toDomain(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    return user ? this.mapper.toDomain(user) : null;
  }

  async findAll(filters?: Record<string, any>): Promise<User[]> {
    const users = filters
      ? await prisma.user.findMany({ where: filters })
      : await prisma.user.findMany();
    return users.map((user: any) => this.mapper.toDomain(user));
  }

  async findActive(): Promise<User[]> {
    const users = await prisma.user.findMany({
      where: { isActive: true },
    });
    return users.map((user: any) => this.mapper.toDomain(user));
  }

  async create(data: Partial<User>): Promise<User> {
    const persistence = this.mapper.toPersistence(data as User);
    const created = await prisma.user.create({ data: persistence });
    return this.mapper.toDomain(created);
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    const updated = await prisma.user.update({
      where: { id },
      data: this.mapper.toPersistence(data as User),
    });
    return this.mapper.toDomain(updated);
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
