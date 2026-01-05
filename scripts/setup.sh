#!/bin/bash
# ============================================================================
# scripts/setup.sh - Initial Environment Setup
# ============================================================================

set -e

echo "🚀 Starting project setup..."

# 1. Install dependencies
echo "📦 Installing npm dependencies..."
npm install

# 2. Setup environment variables
if [ ! -f .env ]; then
  echo "📄 Creating .env file from .env.example..."
  cp .env.example .env
fi

# 3. Start infrastructure (DB, Redis)
echo "🐳 Starting infrastructure containers..."
npm run db:infra

# 4. Wait for DB to be ready
echo "⏳ Waiting for database to be ready..."
sleep 5

# 5. Run migrations and generate prisma client
echo "🗄️  Running database migrations..."
npx prisma db push
npx prisma generate

# 6. Seed database
echo "🌱 Seeding database..."
npm run db:seed

echo "✨ Setup complete! Run 'npm run dev' to start the application."
