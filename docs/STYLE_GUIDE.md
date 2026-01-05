# 🎨 Coding Style Guide

This guide defines the coding standards and best practices for the NodeTS project.

## 🏁 General Principles

- **Clean Code**: Follow SOLID and DRY principles.
- **Consistency**: Use the same patterns throughout the codebase.
- **Type Safety**: Avoid `any`. Use strict typing wherever possible.
- **Async/Await**: Use async/await for asynchronous operations. Avoid callbacks.

## 📁 Naming Conventions

- **Files**: `kebab-case.ts` (e.g., `user.controller.ts`).
- **Classes**: `PascalCase` (e.g., `UserService`).
- **Interfaces**: `IPascalCase` (e.g., `IUserRepository`) - *Optional, but be consistent*.
- **Variables/Functions**: `camelCase` (e.g., `getUserById`).
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `MAX_RETRY_ATTEMPTS`).

## 🏗️ Architecture Layers

- **Domain**: Business rules, entities, and interfaces.
- **Application**: Use cases and business orchestration.
- **Infrastructure**: Database, cache, and external adapters.
- **Presentation**: Controllers, DTOs, and schemas.

## 🧪 Testing Standards

- **Unit Tests**: Test logic in isolation. Mock external dependencies.
- **Integration Tests**: Test interactions between components (e.g., repository and DB).
- **E2E Tests**: Test the full API flow from request to response.

## 🛠️ Tooling

- **Formatting**: Enforced by Prettier.
- **Linting**: Enforced by ESLint (flat config).
- **Git Hooks**: Pre-commit hooks verify types and linting.
- **Commits**: Follow Conventional Commits.
