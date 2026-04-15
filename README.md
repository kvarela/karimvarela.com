# karimvarela.com

Personal portfolio and life site for Karim Varela — built with Next.js 14, NestJS 11, Chakra UI v3, and PostgreSQL in a Yarn monorepo.

## Project Structure

```
karimvarela.com/
├── shared/          # Shared TypeScript types and DTOs
├── backend/         # NestJS API (port 4000)
├── web/             # Next.js frontend (port 3000)
├── docker-compose.yml
└── .env.example
```

## Prerequisites

- Node.js 20+
- Yarn 1.x (classic)
- Docker + Docker Compose

## Local Development Setup

### 1. Start the database

```bash
docker compose up -d
```

This starts PostgreSQL on port 5432 and pgAdmin on port 5050 (login: `admin@local.dev` / `admin`).

### 2. Configure environment variables

```bash
cp .env.example backend/.env
```

Open `backend/.env` and fill in the values:

- **`JWT_SECRET`** — any long random string (32+ characters)
- **`ADMIN_PASSWORD_HASH`** — bcrypt hash of your chosen admin password:
  ```bash
  node -e "const b = require('bcryptjs'); console.log(b.hashSync('yourpassword', 12))"
  ```
- **`ANTHROPIC_API_KEY`** — from console.anthropic.com (for AI blog generation)
- **`GOOGLE_AI_API_KEY`** — from Google AI Studio (for Gemini image generation)

The database URL, username, and CORS origins are pre-filled for local development.

Also create the web env file:

```bash
echo "NEXT_PUBLIC_API_URL=http://localhost:4000\nAPI_URL=http://localhost:4000" > web/.env.local
```

### 3. Install dependencies

```bash
yarn install
```

### 4. Build the shared package

```bash
yarn build:shared
```

### 5. Run database migrations

```bash
yarn migration:run
```

This creates all tables (jobs, education, skills, blog_posts, blog_tags).

### 6. Start the dev servers

```bash
yarn dev
```

This starts both the API (`:4000`) and the web frontend (`:3000`) concurrently.

### 7. Verify everything works

```bash
# API health
curl http://localhost:4000/api/portfolio

# Admin login
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"karim","password":"yourpassword"}'
```

Then open http://localhost:3000 for the portfolio and http://localhost:3000/admin/login for the admin panel.

## Seeding Data

### Resume (Jobs / Education / Skills)

The API automatically imports your Google Docs resume on first startup if the jobs table is empty. To re-run manually:

```bash
curl -X POST http://localhost:4000/api/admin/scrape/resume \
  -H "Authorization: Bearer <your-jwt>"
```

### Blog posts

Import from Medium and the existing karimvarela.com site:

```bash
curl -X POST http://localhost:4000/api/admin/scrape/blogs \
  -H "Authorization: Bearer <your-jwt>"
```

## Useful Scripts

| Command | Description |
|---|---|
| `yarn dev` | Start API + web in parallel |
| `yarn build:shared` | Compile shared types package |
| `yarn migration:generate -- --name MigrationName` | Generate a new migration |
| `yarn migration:run` | Apply pending migrations |
| `yarn migration:revert` | Revert the last migration |

## Routes

| URL | Description |
|---|---|
| `/` | Professional portfolio |
| `/personal` | Venice life — MMA, surfing, gaming |
| `/moto-venice` | Moto Venice motorcycle rental |
| `/blog` | Blog post listing |
| `/blog/[slug]` | Individual blog post |
| `/admin` | Admin dashboard (JWT protected) |
| `/admin/login` | Admin login |
| `/sitemap.xml` | Auto-generated sitemap |

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, Chakra UI v3, Framer Motion, TypeScript
- **Backend**: NestJS 11, TypeORM, PostgreSQL 16, JWT auth, TypeScript
- **AI**: Anthropic Claude (blog generation), Google Gemini Imagen (image generation)
- **Tooling**: Yarn workspaces, Docker Compose, ESLint, Prettier
