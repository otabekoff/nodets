# Installation Guide

## Prerequisites
- Node.js v20+
- Docker & Docker Compose
- PostgreSQL & Redis (optional if using Docker)

## Steps
1. Clone the repository.
2. Install dependencies: `npm install`.
3. Set up environment: `cp .env.example .env`.
4. Start infrastructure: `npm run db:infra`.
5. Run migrations: `npm run db:migrate`.
6. Start development server: `npm run dev`.
