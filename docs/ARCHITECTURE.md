# 🏗️ Architecture Guide

This project follows **Clean Architecture** and **Domain-Driven Design (DDD)** principles to ensure scalability, maintainability, and testability.

## 층 (Layers)

### 1. Domain Layer (`src/features/*/domain`)

- **Entities**: Pure business objects.
- **Value Objects**: Objects defined by their attributes.
- **Domain Services**: Business logic that doesn't belong to a single entity.
- **Interfaces**: Repository contracts.

### 2. Application Layer (`src/features/*/application`)

- **Use Cases**: Orchestrate the flow of data to and from entities.
- **Services**: Application-specific logic.
- **Strategies**: Version-specific behaviors.

### 3. Infrastructure Layer (`src/features/*/infrastructure`)

- **Repositories**: Materialized implementations of domain interfaces.
- **Mappers**: Transform data between database and domain models.
- **External Services**: API clients, adapters.

### 4. Presentation Layer (`src/features/*/presentation`)

- **Controllers**: Handle HTTP requests.
- **DTOs**: Data Transfer Objects for request/response.
- **Validators**: Schema-based validation (Zod).

## 🧩 Dependency Injection

We use **InversifyJS** for loose coupling and easy testing. All dependencies are bound in `src/core/di/container.ts`.

## 🧪 Testing Strategy

All tests are centralized in the root [tests/](file:///home/otabek/Projects/learn/node/nodets/tests/) directory, separated by category:

- **Unit Tests** (`tests/unit`): Testing business logic in isolation.
- **Integration Tests** (`tests/integration`): Testing the interaction between layers and external components.
- **E2E Tests** (`tests/e2e/`): Testing the full API flow from entry to exit.

## 🛣️ API Versioning

Support for multiple versions (v1, v2) is implemented using the **Strategy Pattern**, allowing different behaviors for the same endpoint based on the version.
