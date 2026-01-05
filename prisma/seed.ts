// ============================================================================
// prisma/seed.ts - Database Seeding Script
// ============================================================================
import 'dotenv/config';
import { prisma } from '../src/infrastructure/database/index.js';
import bcrypt from 'bcrypt';

/**
 * Seed the database with initial data
 */
async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  await prisma.refreshToken.deleteMany();
  await prisma.user.deleteMany();
  await prisma.product.deleteMany();

  // Create admin user
  const adminPassword = await bcrypt.hash('Admin123!', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'admin',
      isActive: true,
    },
  });

  console.log('✅ Created admin user:', admin.email);

  // Create regular users
  const userPassword = await bcrypt.hash('User123!', 10);
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'john@example.com',
        name: 'John Doe',
        password: userPassword,
        role: 'user',
      },
    }),
    prisma.user.create({
      data: {
        email: 'jane@example.com',
        name: 'Jane Smith',
        password: userPassword,
        role: 'user',
      },
    }),
  ]);

  console.log(`✅ Created ${users.length} regular users`);

  // Create products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'MacBook Pro',
        description: '16-inch, M3 Max',
        price: 2999.99,
        stock: 10,
      },
    }),
    prisma.product.create({
      data: {
        name: 'iPhone 15 Pro',
        description: '256GB, Titanium',
        price: 1199.99,
        stock: 25,
      },
    }),
    prisma.product.create({
      data: {
        name: 'AirPods Pro',
        description: '2nd generation',
        price: 249.99,
        stock: 50,
      },
    }),
  ]);

  console.log(`✅ Created ${products.length} products`);

  console.log('🎉 Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
