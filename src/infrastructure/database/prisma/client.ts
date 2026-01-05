// ============================================================================
// src/infrastructure/database/prisma/client.ts - Prisma Client Singleton
// ============================================================================
import { PrismaClient } from "../../../generated/prisma/index.js";
import { PrismaPg } from "@prisma/adapter-pg";
import pkg from "pg";
const { Pool } = pkg;

/**
 * Prisma Client Singleton with PostgreSQL Adapter for Prisma 7.x
 */
class PrismaClientSingleton {
  private static instance: PrismaClient;

  static getInstance(): PrismaClient {
    if (!PrismaClientSingleton.instance) {
      // Create PostgreSQL connection pool
      const connectionString = process.env.DATABASE_URL;
      const pool = new Pool({ connectionString });
      const adapter = new PrismaPg(pool);

      // Initialize Prisma Client with adapter
      PrismaClientSingleton.instance = new PrismaClient({
        adapter,
        log:
          process.env.NODE_ENV === "development"
            ? ["query", "error", "warn"]
            : ["error"],
      });
    }

    return PrismaClientSingleton.instance;
  }

  static async disconnect(): Promise<void> {
    if (PrismaClientSingleton.instance) {
      await PrismaClientSingleton.instance.$disconnect();
    }
  }
}

export const prisma = PrismaClientSingleton.getInstance();
