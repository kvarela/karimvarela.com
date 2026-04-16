# karimvarela.com — Claude Guidance

## Project Overview

Monorepo with three packages:
- `web/` — Next.js 14 App Router frontend (Chakra UI v3, Framer Motion)
- `backend/` — NestJS API with TypeORM + PostgreSQL
- `shared/` — TypeScript types and DTOs shared between web and backend

## Shared Components — Use Them First

Before building anything new, check if a shared component already covers the need.

### UI Primitives (`web/src/components/ui/`)
| Component | Use for |
|-----------|---------|
| `SectionHeading` | Every section title (takes `number` + `title` props) |
| `GlowCard` | Any card with a neon-glow border |
| `NeonBadge` | Inline tags, skill chips, labels |
| `MatrixRain` | Full-page animated background (used on every page) |

### Layout (`web/src/components/layout/`)
| Component | Use for |
|-----------|---------|
| `SidebarNav` | Primary nav — handles desktop sidebar + mobile drawer in one instance |
| `Footer` | Page footer — use on every page |

### Portfolio Sections (`web/src/components/portfolio/`)
These accept typed props from the shared package and should be reused across pages:
- `HeroSection` — name/tagline/CTA (home page intro)
- `AboutSection` — bio and tech stack
- `ExperienceSection` — jobs list (accepts `jobs: Job[]`)
- `SkillsSection` — grouped skill badges (accepts `skills: Skill[]`)
- `EducationSection` — education cards (accepts `education: Education[]`)

### Rules
1. **Reuse before creating.** Check `components/ui/`, `components/layout/`, and `components/portfolio/` first.
2. **Consistent layout pattern.** Every full page uses: `MatrixRain` background → `Grid` with `SidebarNav` + main content → `Footer`.
3. **Colors and fonts from the design system.** Neon green `#00ff41` / `#39ff14`, dark bg `#0a0a0a`, `var(--font-mono)` for UI text.
4. **Shared types from `@karimvarela/shared`.** Import `Job`, `Education`, `Skill`, etc. from the shared package — never redefine them.
5. **Server components for data fetching.** Fetch portfolio data in server components (like `page.tsx`) and pass down as props. Child components that use Framer Motion must be `'use client'`.
6. **Nav items in `constants.ts`.** Add new routes to `NAV_ITEMS` (or a page-specific array like `PERSONAL_NAV_ITEMS`) in `web/src/lib/constants.ts`.

## Development

```bash
# Install all workspace deps
yarn install

# Run everything (web + backend)
yarn dev

# Web only
yarn workspace web dev

# Backend only
yarn workspace backend dev
```

Web runs on http://localhost:3000, API on http://localhost:4000.

## Data Flow

Portfolio data (jobs, education, skills) is fetched from `/api/portfolio` at build time with hourly ISR revalidation. The admin dashboard at `/admin` has controls to re-import from Google Docs.
