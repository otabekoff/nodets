// ============================================================================
// features/auth/infrastructure/repositories/auth.repository.ts
// ============================================================================
import { injectable } from "inversify";
import { prisma } from "@infrastructure/database/index.js";
import type { IAuthRepository } from "./auth.repository.interface.js";
import { RefreshToken } from "../../domain/Auth.entity.js";
import { User } from "@features/users/domain/User.entity.js";
import { UserMapper } from "@features/users/infrastructure/mappers/user.mapper.js";

@injectable()
export class AuthRepository implements IAuthRepository {
  private userMapper: UserMapper;

  constructor() {
    this.userMapper = new UserMapper();
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    return user ? this.userMapper.toDomain(user) : null;
  }

  async createUser(data: Partial<User>): Promise<User> {
    const persistence = this.userMapper.toPersistence(data as User);
    const created = await prisma.user.create({ data: persistence });
    return this.userMapper.toDomain(created);
  }

  async saveRefreshToken(token: RefreshToken): Promise<RefreshToken> {
    const saved = await prisma.refreshToken.create({
      data: {
        id: token.id,
        token: token.token,
        userId: token.userId,
        expiresAt: token.expiresAt,
        isRevoked: token.isRevoked,
      },
    });

    return new RefreshToken(
      saved.id,
      saved.token,
      saved.userId,
      saved.expiresAt,
      saved.isRevoked,
      saved.createdAt,
    );
  }

  async findRefreshToken(token: string): Promise<RefreshToken | null> {
    const found = await prisma.refreshToken.findUnique({
      where: { token },
    });

    if (!found) return null;

    return new RefreshToken(
      found.id,
      found.token,
      found.userId,
      found.expiresAt,
      found.isRevoked,
      found.createdAt,
    );
  }

  async revokeRefreshToken(token: string): Promise<void> {
    await prisma.refreshToken.update({
      where: { token },
      data: { isRevoked: true },
    });
  }

  async revokeAllUserTokens(userId: string): Promise<void> {
    await prisma.refreshToken.updateMany({
      where: { userId },
      data: { isRevoked: true },
    });
  }
}
