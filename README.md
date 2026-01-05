# 🚀 Enterprise Node.js TypeScript API

A production-ready, scalable REST API built with Node.js, TypeScript, and Clean Architecture principles.

## ✨ Features

### Architecture

- 🏗️ **Clean Architecture** - Separation of concerns with clear boundaries
- 📦 **Feature-Based** - Modular structure organized by business domains
- 🔄 **API Versioning** - Support for multiple API versions (Strategy Pattern)
- 💉 **Dependency Injection** - Using InversifyJS for IoC
- 🎯 **Use Case Pattern** - Clear business logic separation
- 📝 **Repository Pattern** - Data access abstraction

### Development

- ⚡ **TypeScript** - Full type safety and modern JavaScript features
- 🔥 **Hot Reload** - Development with tsx watch mode
- ✅ **Validation** - Request validation using Zod schemas
- 🧪 **Testing** - Unit, integration, and e2e tests with Vitest
- 📚 **Documentation** - Swagger UI and ReDoc API documentation
- 🎨 **Code Quality** - ESLint, Prettier, and Husky pre-commit hooks

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

```
src/
├── api/                    # API Routes & Controllers
│   └── routes/
│       ├── v1/            # Version 1 routes
│       └── v2/            # Version 2 routes
├── core/                   # Core Framework
│   ├── config/            # Configuration
│   ├── di/                # Dependency Injection
│   ├── errors/            # Error classes
│   ├── events/            # Event system
│   ├── interfaces/        # Core interfaces
│   ├── middlewares/       # Express middlewares
│   └── utils/             # Utility functions
├── domain/                 # Domain Layer (Optional shared entities)
├── features/               # Feature Modules
│   ├── auth/
│   │   ├── domain/        # Business entities
│   │   ├── application/   # Use cases & services
│   │   │   ├── services/
│   │   │   ├── use-cases/
│   │   │   └── strategies/  # Version strategies
│   │   ├── infrastructure/ # Data access & external services
│   │   │   ├── repositories/
│   │   │   └── mappers/
│   │   └── presentation/   # Controllers & DTOs
│   │       ├── controllers/
│   │       ├── dtos/
│   │       └── validators/
│   └── users/
│       └── [same structure]
├── infrastructure/         # Shared Infrastructure
│   ├── cache/
│   ├── database/
│   ├── email/
│   └── storage/
├── shared/                 # Shared Utilities
│   ├── constants/
│   ├── enums/
│   └── types/
├── jobs/                   # Background Jobs
├── app.ts                  # Express app setup
├── server.ts               # Server entry point
└── index.ts                # Main entry
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0
- PostgreSQL >= 14
- Redis >= 7 (optional, for caching)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/otabekoff/nodets.git
   cd nodets
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Generate Prisma client**

   ```bash
   npm run db:generate
   ```

5. **Run database migrations**

   ```bash
   npm run db:migrate
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

The API will be available at:

- 🌐 API: `http://localhost:3000/api`
- 📚 Swagger: `http://localhost:3000/api-docs`
- 📖 ReDoc: `http://localhost:3000/redoc`

## 🐳 Docker

### Development with Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
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

# Generate coverage report
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

## KEY PRINCIPLES:

1. Clean Architecture Layers:
   - Domain: Pure business logic, no dependencies
   - Application: Use cases, orchestration
   - Infrastructure: External concerns (DB, cache, etc.)
   - Presentation: Controllers, DTOs, validators
2. Dependency Rule:
   Inner layers know nothing about outer layers
   Dependencies point inward
3. Feature-Based Organization:
   Each feature is self-contained with its own layers
4. Version Strategy Pattern:
   Versions are behaviors, not folder structures
   Strategy pattern allows runtime version selection
5. Separation of Concerns:
   Each file has a single responsibility
   Clear boundaries between layers

## 🏗️ Architecture Principles

### Clean Architecture Layers

1. **Domain Layer**
   - Pure business logic
   - No external dependencies
   - Framework-independent

2. **Application Layer**
   - Use cases (user stories)
   - Business orchestration
   - Interfaces for infrastructure

3. **Infrastructure Layer**
   - External services (DB, cache, email)
   - Framework implementations
   - Third-party integrations

4. **Presentation Layer**
   - Controllers
   - DTOs
   - Request/Response handling

### Design Patterns

- **Repository Pattern**: Data access abstraction
- **Use Case Pattern**: Single responsibility per business operation
- **Strategy Pattern**: Version-specific behavior
- **Factory Pattern**: Object creation
- **Dependency Injection**: Loose coupling

### SOLID Principles

- **S**ingle Responsibility
- **O**pen/Closed
- **L**iskov Substitution
- **I**nterface Segregation
- **D**ependency Inversion

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Otabek Sadiridinov**

- GitHub: [@otabekoff](https://github.com/otabekoff)

## 🙏 Acknowledgments

- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) by Uncle Bob
- [Domain-Driven Design](https://www.domainlanguage.com/ddd/) by Eric Evans
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)

---

Made with ❤️ by Otabek Sadiridinov
