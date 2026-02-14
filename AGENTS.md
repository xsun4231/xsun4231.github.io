# AGENTS.md - AI Coding Guidelines

> Guidelines for AI agents working on this Astro 5.x + Tailwind CSS 4.x personal website.

## Project Overview

**Tech Stack**: Astro 5.x, Tailwind CSS 4.x, TypeScript (strict mode)
**Type**: Personal website with blog, portfolio, about page
**Deployment**: GitHub Pages via GitHub Actions

---

## Build / Lint / Test Commands

```bash
npm run dev          # Start dev server at localhost:4321
npm run build        # Production build to ./dist/
npm run preview      # Preview production build locally
npm run lint         # ESLint check (.js, .ts, .astro)
npm run lint:fix     # ESLint with auto-fix
npm run format       # Prettier format all files
npm run format:check # Prettier check without writing
npm run check        # Run both lint and format:check
npm run astro        # Astro CLI (e.g., npm run astro -- add mdx)
```

**No test runner configured.** If adding tests, use `src/__tests__/` or `__tests__/`.

---

## Code Style Guidelines

### Imports

```typescript
// Order: Astro -> Third-party -> Local (alphabetical)
import type { GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { z } from 'zod';
import BaseLayout from '../../layouts/BaseLayout.astro';
import BlogCard from '../../components/blog/BlogCard.astro';
```

### TypeScript

- **Strict mode** - all types must be explicit
- Use `type` for type imports
- Avoid `any` - use `unknown` with type guards
- Use `satisfies` for type-safe assertions

```typescript
// Good: interface BlogPost { id: string; title: string; }
const posts = (await getCollection('blog')) satisfies CollectionEntry<'blog'>[];
// Bad:  const posts: any = await getCollection('blog');
```

### Astro Component Structure

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
interface Props {
  title: string;
  variant?: 'primary' | 'secondary';
}
const { title, variant = 'primary' } = Astro.props;
const formattedTitle = title.toUpperCase();
---

<BaseLayout><h1>{formattedTitle}</h1><slot /></BaseLayout>
<style>
  h1 {
    color: var(--color-primary);
  }
</style>
```

### Naming Conventions

- **Files**: PascalCase for components (`BlogCard.astro`), camelCase for utilities
- **Components**: `.astro` for Astro, `.client.ts` for client scripts
- **Variables**: camelCase, UPPER_SNAKE for constants

### Formatting (Prettier)

```javascript
{ semi: true, trailingComma: 'es5', singleQuote: true, printWidth: 100, tabWidth: 2, useTabs: false, bracketSpacing: true, arrowParens: 'avoid' }
```

### Tailwind CSS 4.x

- **No `@apply`** - use standard CSS instead
- Dark mode: use `.dark` class with `:global()` wrapper

```css
/* Good */
.prose {
  color: #1f2937;
}
:global(.dark) .prose {
  color: #e5e7eb;
}
/* Bad */
.prose {
  @apply text-gray-800;
}
```

### Error Handling

- Use Astro's error handling in dynamic routes
- Validate Content Collections with Zod schemas
- Handle optional props with defaults

---

## Project Structure

```
src/
├── components/    # Reusable components (blog/, layout/, ui/)
├── content/       # Content Collections (blog/, projects/, config.ts)
├── layouts/       # Page layouts
├── pages/         # Route pages (blog/, *.astro)
├── styles/       # Global styles (global.css, code.css)
└── utils/        # Utilities (theme.client.ts)
```

---

## Content Collections

Define schemas in `src/content/config.ts`:

```typescript
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});
```

---

## AI Agent Instructions

1. Run `npm run check` after changes
2. Verify builds pass with `npm run build` before completing
3. Follow strict TypeScript - no implicit `any` types
4. Use Content Collections API for all content operations
5. Prefer server-side rendering - minimize client JS
6. Test both themes - light and dark mode
7. Keep components focused - single responsibility

---

_Generated: 2026-02-13_ | _Version: 1.1_
