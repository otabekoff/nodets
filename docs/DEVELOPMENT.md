# 🛠️ Development Guide

Guidelines for setting up and working on the project locally.

## 📦 Environment Setup

### 1. Automatic Setup (Recommended)

Run the included setup script to install dependencies, configure environment variables, and start infrastructure:

```bash
./scripts/setup.sh
```

### 2. Manual Setup

If you prefer manual control:

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Start infrastructure
npm run db:infra

# Database initialization
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
