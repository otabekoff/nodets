# 🚀 Enterprise Node.js TypeScript API

A production-ready, scalable REST API built with Node.js, TypeScript, and Clean Architecture principles and more.

## ✨ Features

### Modern Stack

- ⚡ **TypeScript** - Full type safety and modern JavaScript features
- 🔥 **Hot Reload** - Development with tsx watch mode
- ✅ **Validation** - Request validation using Zod schemas
- 🧪 **Testing** - 100% core logic coverage with Vitest
- 📚 **Documentation** - Swagger UI and ReDoc API documentation
- 💎 **Modern & Clean** - Zero installation warnings, dependencies up-to-date, and multi-Node compatibility
- 🎨 **Code Quality** - ESLint, Prettier, and Husky pre-commit hooks
- 🧩 **Modular** - Feature-slice architecture for scalability

### Security & Performance

- 🔒 **Authentication** - JWT-based authentication with refresh tokens
- 🛡️ **Authorization** - Role-based access control (RBAC)
- 🚦 **Rate Limiting** - Protection against abuse
- 🔐 **Security Headers** - Helmet.js for HTTP security
- ⚡ **Compression** - Response compression
- 🗄️ **Caching** - Redis-based caching layer

### Infrastructure

- 🐳 **Docker** - Containerized application
- 📊 **Database** - PostgreSQL with Prisma ORM
- 🔴 **Redis** - Caching and session management
- 📝 **Logging** - Structured logging with Pino
- 🔄 **Background Jobs** - Job queue with Bull

## 📁 Project Structure

- **[src/](src/)**
  - **[api/](src/api/)** - API Routes & Configuration
    - **[routes/](src/api/routes/)** - Versioned Resource Routes
    - **[index.ts](src/api/index.ts)** - Route Aggregator
  - **[core/](src/core/)** - Core Framework
    - **[config/](src/core/config/)** - Environment & Validated Config
    - **[di/](src/core/di/)** - Dependency Injection Container
    - **[errors/](src/core/errors/)** - Custom Error Hierarchy
    - **[events/](src/core/events/)** - Typed Event System
    - **[interfaces/](src/core/interfaces/)** - Core Interfaces (IService, etc.)
    - **[middlewares/](src/core/middlewares/)** - Express Middlewares (Validation, Error, etc.)
    - **[utils/](src/core/utils/)** - Core Utilities (Auth, Date, Response)
  - **[domain/](src/domain/)** - Shared Domain Layer
    - **[entities/](src/domain/entities/)** - Base Entities
    - **[events/](src/domain/events/)** - Domain Events
  - **[features/](src/features/)** - Feature Modules (Vertical Slices)
    - **[auth/](src/features/auth/)**
      - **[domain/](src/features/auth/domain/)** - Entities & Repository Interfaces
      - **[application/](src/features/auth/application/)** - Use Cases & Services
      - **[infrastructure/](src/features/auth/infrastructure/)** - Repositories & External Services
      - **[presentation/](src/features/auth/presentation/)** - Controllers, DTOs, & Validators
    - **[users/](src/features/users/)** - [Standard Feature Structure]
  - **[infrastructure/](src/infrastructure/)** - Shared Infrastructure Mechanisms
    - **[cache/](src/infrastructure/cache/)** - Redis & Memory Cache implementations
    - **[database/](src/infrastructure/database/)** - Prisma Client Singleton
    - **[email/](src/infrastructure/email/)** - Email Service Providers
    - **[queue/](src/infrastructure/queue/)** - Bull Job Queues
    - **[storage/](src/infrastructure/storage/)** - File Storage Strategies
  - **[jobs/](src/jobs/)** - Background Job Definitions
    - **[auth/](src/jobs/auth/)** - Auth-related jobs
    - **[users/](src/jobs/users/)** - User-related jobs
  - **[shared/](src/shared/)** - Shared Utilities & Constants
  - **[app.ts](src/app.ts)** - Express App Factory
  - **[server.ts](src/server.ts)** - Server Entry Point
  - **[index.ts](src/index.ts)** - Application Bootstrap

## 🚀 Getting Started

### Prerequisites

- Node.js (Tested on 20.x, 22.x, 24.x, 25.x)
- npm >= 10.0.0
- Docker Desktop with Compose V2
- PostgreSQL & Redis (or use Docker)

### Quick Setup

```bash
# Clone and setup everything automatically
git clone https://github.com/otabekoff/nodets.git
cd nodets

# Run the automated setup script
./scripts/setup.sh
```

**Note**: The setup script handles dependency installation, database setup, and environment configuration.

### Manual Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start Infrastructure**
   ```bash
   npm run db:infra
   ```

3. **Database Setup**
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

4. **Start Development**
   ```bash
   npm run dev
   ```

## 🐳 Docker

### Modern Docker Compose
This project uses Docker Compose V2. Use `docker compose` instead of `docker-compose`.

```bash
# Start all services
npm run docker:up

# View logs
npm run docker:logs

# Stop services
npm run docker:down
```

### Production Build

```bash
# Build image
docker build -t nodets:latest .

# Run container
docker run -p 3000:3000 --env-file .env nodets:latest
```

## 📖 API Documentation

### Versioning

The API supports multiple versioning strategies:

1. **URL Path** (Recommended)

   ```
   GET /api/v1/users
   GET /api/v2/users
   ```

2. **Header**

   ```
   GET /api/users
   API-Version: v1
   ```

3. **Query Parameter**
   ```
   GET /api/users?version=v1
   ```

### Version Differences

**V1 (Basic)**

- Returns core data only
- Standard response format
- Suitable for simple integrations

**V2 (Enhanced)**

- Additional metadata
- Enhanced profile information
- Advanced filtering options
- Activity timestamps

### Authentication

Most endpoints require JWT authentication:

```bash
# Register
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","name":"John Doe","password":"password123"}'

# Login
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Use token
curl http://localhost:3000/api/v1/users/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration

# Run e2e tests
npm run test:e2e

# Generate coverage report (Current: 100% Core Coverage)
npm run test:coverage

# Watch mode
npm run test:watch
```

## 🛠️ Development

### Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format

# Type check
npm run type-check

# Validate everything
npm run validate
```

### Database

```bash
# Generate Prisma client
npm run db:generate

# Create migration
npm run db:migrate

# Reset database
npm run db:reset

# Seed database
npm run db:seed

# Open Prisma Studio
npm run db:studio
```

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📚 Documentation

Detailed technical documentation can be found in the [docs/](docs/) folder:

- [🏗️ Architecture & Principles](docs/ARCHITECTURE.md)
- [🛠️ Development & Setup Guide](docs/DEVELOPMENT.md)
- [📝 Implementation Guide](docs/IMPLEMENTATION_GUIDE.md)
- [📊 Refactoring Completion Summary](docs/COMPLETION_SUMMARY.md)

## 🤝 Community & Support

We welcome contributions and value our community:

- [🤝 Contributing Guide](CONTRIBUTING.md)
- [📜 Code of Conduct](CODE_OF_CONDUCT.md)
- [🔒 Security Policy](SECURITY.md)
- [📝 License](LICENSE.md)

## 👤 Author

**Otabek Sadiridinov**

- GitHub: [@otabekoff](https://github.com/otabekoff)

## 🙏 Acknowledgments

- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) by Uncle Bob
- [Domain-Driven Design](https://www.domainlanguage.com/ddd/) by Eric Evans
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)

---

Made with ❤️ by Otabek Sadiridinov
