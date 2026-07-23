# Contributing to METIC Website

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (Neon or local)
- Git

---

## Getting Started

```bash
git clone https://github.com/fiidev/metic-website.git
cd metic-website
npm install
cp .env.example .env
```

Set `DATABASE_URL` in `.env` to your PostgreSQL connection string.

```bash
npm run db:generate
npm run db:migrate
npm run db:seed       # optional — populates sample data
npm run dev            # http://localhost:3000
```

---

## Workflow

### 1. Decide What to Work On

No issues? Pick anything you think should be added, fixed, or improved. If it's a significant change, consider opening an issue first to discuss it.

### 2. Create a Branch

```bash
git checkout -b <type>/<short-description>
```

| Type         | When                          |
|--------------|-------------------------------|
| `feat/`      | New feature                   |
| `fix/`       | Bug fix                       |
| `chore/`     | Maintenance, deps, tooling    |
| `docs/`      | Documentation                 |
| `refactor/`  | Code restructuring            |

Examples: `feat/division-filter`, `fix/responsive-header`, `chore/update-prisma`.

### 3. Make Changes

- Use `@/` path aliases: `import { prisma } from "@/lib/prisma"`
- Use `cn()` from `@/lib/clsx` for conditional class names
- Prefer server components — only use `"use client"` when browser APIs or hooks are needed
- If modifying `prisma/schema.prisma`, run `npm run db:migrate` and `npm run db:generate`

### 4. Commit

```bash
git add <files>
git commit -m "<type>: <concise message>"
```

Keep commits atomic — one logical change per commit.

```
feat: add division filter to homepage
fix: registration form not submitting on enter
chore: bump prisma to v7
```

### 5. Push

```bash
git push origin <branch-name>
```

### 6. Open a Pull Request

- Go to your repo on GitHub and click **Compare & pull request**
- Use a clear title matching your commit style
- Reference the issue in the description: `Closes #12`
- Include screenshots if changes affect the UI
- Mark as draft if still work in progress

---

## PR Checklist

- [ ] `npm run lint` passes — no errors
- [ ] `npm run build` passes — no errors
- [ ] No leftover `console.log`, commented code, or unused imports
- [ ] Manually tested on local environment

---

## Need Help?

Open an issue or comment on the relevant PR/issue. We'll get back to you.
