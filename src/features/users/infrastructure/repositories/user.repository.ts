// ============================================================================
// features/users/infrastructure/repositories/user.repository.ts
// ============================================================================
import { injectable } from 'inversify';
import { PrismaClient } from '@prisma/client';
import { IUserRepository } from './user.repository.interface.js';
import { User } from '../../domain/User.entity.js';
import { UserMapper } from '../mappers/user.mapper.js';

@injectable()
export class UserRepository implements IUserRepository {
  private prisma: PrismaClient;
  private mapper: UserMapper;

  constructor() {
    this.prisma = new PrismaClient();
    this.mapper = new UserMapper();
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? this.mapper.toDomain(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? this.mapper.toDomain(user) : null;
  }

  async findAll(filters?: Record<string, any>): Promise<User[]> {
    const users = await this.prisma.user.findMany({ where: filters });
    return users.map(user => this.mapper.toDomain(user));
  }

  async findActive(): Promise<User[]> {
    const users = await this.prisma.user.findMany({ 
      where: { isActive: true } 
    });
    return users.map(user => this.mapper.toDomain(user));
  }

  async create(data: Partial<User>): Promise<User> {
    const persistence = this.mapper.toPersistence(data as User);
    const created = await this.prisma.user.create({ data: persistence });
    return this.mapper.toDomain(created);
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    const updated = await this.prisma.user.update({
      where: { id },
      data: this.mapper.toPersistence(data as User),
    });
    return this.mapper.toDomain(updated);
  }

  async delete(id: string): Promise<boolean> {
    await this.prisma.user.delete({ where: { id } });
    return true;
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.user.count({ where: { id } });
    return count > 0;
  }
}