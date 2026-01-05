# 🛠️ Development Guide

Guidelines for setting up and working on the project locally.

## 📦 Environment Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

The `.env` file needs JWT secrets configured. Generate secure secrets and copy the example:

```bash
# Generate secure JWT secrets
openssl rand -base64 48

# Copy example and edit
cp .env.example .env
```

**Required `.env` values:**

- `JWT_SECRET`: Minimum 32 characters.
- `JWT_REFRESH_SECRET`: Minimum 32 characters.
- `DATABASE_URL`: PostgreSQL connection string.

### 3. Infrastructure & Database

Start the external infrastructure (Postgres, Redis):

```bash
npm run db:infra
```

Generate Prisma client and run migrations:

```bash
npm run db:generate
npm run db:migrate
```

## 🏗️ Commands

- `npm run dev`: Start development server with `nodemon`.
- `npm run dev:tsx`: Quick start with `tsx watch`.
- `npm run build`: Compile TypeScript to JavaScript.
- `npm run start`: Run the compiled production build.
- `npm run type-check`: Verify types without emitting files.

## 🧪 Testing

- `npm run test`: Run all tests.
- `npm run test:unit`: Run Vitest unit tests.
- `npm run test:integration`: Run integration tests.
- `npm run test:coverage`: Generate coverage report.

## 🌐 API Exploration

- **API Base**: `http://localhost:3000/api`
- **Health Check**: `http://localhost:3000/api/health`
- **Swagger UI**: `http://localhost:3000/api-docs`
- **ReDoc**: `http://localhost:3000/redoc`

## 🎨 Code Quality

- **Prettier**: Code formatting is enforced via Husky pre-commit hooks.
- **ESLint**: Static analysis using the modern flat configuration (`eslint.config.js`).
- **Husky**: Automated checks on `pre-commit` (lint, type-check) and `commit-msg` (conventional commits).
