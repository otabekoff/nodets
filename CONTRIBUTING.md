# 🤝 Contributing Guide

We welcome contributions! Please follow these guidelines to maintain code quality.

## 🚀 Development Workflow

1. **Branching**: Create a feature branch from `main`.

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Conventional Commits**: We follow [Conventional Commits](https://www.conventionalcommits.org/).
   - `feat:` New features
   - `fix:` Bug fixes
   - `docs:` Documentation changes
   - `refactor:` Code changes that neither fix a bug nor add a feature

3. **Pre-commit Hooks**: Husky runs linting and tests automatically before each commit.

## 🛠️ Standards

- **TypeScript**: Use strict typing. Avoid `any`.
- **Linting**: Run `npm run lint` before submitting.
- **Testing**: Add unit tests for new logic. Run `npm test`.

## 📬 Pull Requests

- Provide a clear description of changes.
- Link related issues.
- Ensure all tests pass in CI.
