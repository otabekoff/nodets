# 🛠️ Development Guide

Guidelines for setting up and working on the project locally.

## 📦 Environment Setup

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Configure Environment**:

   ```bash
   cp .env.example .env
   ```

3. **Infrastructure**:
   Start database and cache:
   ```bash
   npm run db:infra
   ```

## 🏗️ Commands

- `npm run dev`: Start development server with hot reload.
- `npm run build`: Compile TypeScript to JavaScript.
- `npm run type-check`: Verify types without emitting files.
- `npm run db:migrate`: Sync database schema with Prisma.

## 🧪 Testing

- `npm run test:unit`: Run Vitest unit tests.
- `npm run test:integration`: Run integration tests.
- `npm run test:coverage`: Generate coverage report.

## 🎨 Code Style

- **Prettier**: Formatting is enforced via pre-commit hooks.
- **ESLint**: Static analysis for catch common errors.
