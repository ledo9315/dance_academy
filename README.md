# Angela's Dance Academy

Marketing site and gallery/schedule admin for Angela's Dance Academy, Naples FL.

- **Framework:** Next.js 16 (App Router, React 19, Turbopack)
- **Styling:** Tailwind CSS 4 + a small set of shadcn/ui primitives
- **Database:** PostgreSQL via Prisma 7 (`@prisma/adapter-pg`)
- **Auth:** better-auth (email + password, sign-up disabled)
- **Storage:** Vercel Blob for gallery images
- **E-mail:** Resend for the contact form

## Getting started

```bash
npm install
cp .env.example .env   # fill in the values
npm run db:deploy      # apply migrations
npm run db:seed        # optional: default class schedule
npm run dev
```

Create an admin account (public sign-up is disabled by design):

```bash
npx tsx scripts/create-admin.ts "Angela" angela@example.com "a-strong-password"
```

## Scripts

| Command              | Description                                         |
| -------------------- | --------------------------------------------------- |
| `npm run dev`        | Development server                                  |
| `npm run build`      | Generate the Prisma client and build for production |
| `npm run lint`       | ESLint (flat config, `eslint-config-next`)          |
| `npm run typecheck`  | TypeScript, no emit                                 |
| `npm run format`     | Prettier, including Tailwind class sorting          |
| `npm run db:migrate` | Create and apply a migration in development         |
| `npm run db:deploy`  | Apply pending migrations (CI/production)            |
| `npm run db:seed`    | Seed the default class schedule                     |

## Project layout

```
app/                 Routes. Public pages are Server Components.
  admin/             Admin area, guarded by the layout and every action.
components/          Presentational components; `ui/` holds shadcn primitives.
content/             Editorial content (FAQ, programs, testimonials).
lib/
  actions/           Server actions — the only write path, each one validated.
  queries/           Read-only database access for Server Components.
  auth.ts            better-auth instance plus `getSession` / `requireSession`.
  env.ts             Environment contract, parsed once at startup.
  site.ts            Studio details used by pages, e-mails and structured data.
prisma/              Schema, migrations and seed.
proxy.ts             Optimistic redirect for `/admin/*` (Next 16 middleware).
```

## Conventions

- **Reads** happen in Server Components through `lib/queries`; **writes** happen in
  server actions under `lib/actions`. There are no public REST endpoints besides
  the better-auth handler.
- Every action calls `requireSession()` before touching data, and validates its
  input with Zod before trusting it.
- Business details (address, phone, socials) live in `lib/site.ts` only.
