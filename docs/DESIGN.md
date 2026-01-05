# System Design

NodeTS is designed with **Clean Architecture** at its core.

## Structure Overview
- **Layers**: Domain, Application, Infrastructure, Presentation.
- **Communication**: Unidirectional dependency flow (inward).
- **Decoupling**: Interfaces and Dependency Injection (InversifyJS).
- **Scalability**: Feature-based modularity.
- **Reliability**: Strict TypeScript, Zod validation, and automated testing.
