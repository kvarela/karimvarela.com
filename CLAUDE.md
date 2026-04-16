# karimvarela.com

Personal website monorepo built with Next.js (frontend) and NestJS (backend).

## Structure

```
.
├── web/        # Next.js 14 frontend (port 3000)
├── backend/    # NestJS 10 API server (port 4000)
└── shared/     # Shared TypeScript types and DTOs
```

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Chakra UI v3, Zustand, Framer Motion
- **Backend**: NestJS 10, TypeORM, PostgreSQL, JWT auth, Swagger
- **Shared**: TypeScript types/DTOs only
- **Package manager**: Yarn 1.x workspaces

## Setup

```bash
# Install all dependencies
yarn install

# Copy env files
cp .env.example .env
cp backend/.env.example backend/.env

# Start dev servers (frontend + backend concurrently)
yarn dev
```

## CI Checks

Two checks run on every push and pull request (`.github/workflows/ci.yml`):

| Check | Frontend | Backend |
|-------|----------|---------|
| TypeScript | `tsc --noEmit` | `tsc --noEmit` |
| ESLint | `next lint` | `eslint "{src}/**/*.ts"` |

**Both checks must pass before pushing code.**

Run them locally before pushing:

```bash
# Run all checks across all workspaces
yarn typecheck
yarn lint

# Or per workspace
yarn workspace @karimvarela/web typecheck
yarn workspace @karimvarela/web lint
yarn workspace @karimvarela/backend typecheck
yarn workspace @karimvarela/backend lint
```

## Common Scripts

```bash
yarn dev                  # Start frontend + backend in watch mode
yarn build                # Build all packages (shared → backend → web)
yarn typecheck            # TypeScript check across all workspaces
yarn lint                 # ESLint across all workspaces
yarn lint:fix             # Auto-fix lint issues (backend: yarn workspace @karimvarela/backend lint:fix)
yarn format               # Prettier format all source files
```

### Database Migrations

```bash
yarn migration:generate   # Generate a new migration
yarn migration:run        # Run pending migrations (local)
yarn migration:revert     # Revert last migration
```

## Environment Variables

See `.env.example` and `backend/.env.example` for required variables.
