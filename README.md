# xsun4231.github.io

Personal website built with Astro 5, Tailwind CSS 4, and TypeScript.

**Live**: [xsun4231.github.io](https://xsun4231.github.io)

## Tech Stack

- [Astro 5](https://astro.build/) - Static site generator
- [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS
- [TypeScript](https://www.typescriptlang.org/) - Strict mode
- [Fuse.js](https://www.fusejs.io/) - Client-side fuzzy search
- [Shiki](https://shiki.style/) - Syntax highlighting
- [MDX](https://mdxjs.com/) - Markdown with components

## Features

- Dark-first design with light mode toggle
- Blog with Markdown/MDX content collections
- Full-text search (Ctrl+K / Cmd+K)
- Tag-based filtering and tag pages
- RSS feed
- Responsive layout
- Syntax-highlighted code blocks

## Project Structure

```
src/
├── components/
│   ├── blog/        # BlogCard, BlogList
│   ├── layout/      # Navbar, Footer, ThemeToggle
│   └── ui/          # Card, Button, SearchModal
├── content/
│   └── blog/        # Markdown blog posts
├── layouts/         # BaseLayout
├── pages/
│   ├── blog/        # Blog index, [slug] pages
│   ├── tags/        # Tag index, [tag] pages
│   ├── about.astro
│   ├── index.astro
│   ├── rss.xml.ts
│   └── search-index.json.ts
├── styles/          # global.css, code.css
└── utils/           # theme.client.ts
```

## Getting Started

```bash
npm install
npm run dev          # http://localhost:4321
```

## Scripts

| Command            | Description                   |
| ------------------ | ----------------------------- |
| `npm run dev`      | Start dev server              |
| `npm run build`    | Production build to `./dist/` |
| `npm run preview`  | Preview production build      |
| `npm run lint`     | ESLint check                  |
| `npm run lint:fix` | ESLint with auto-fix          |
| `npm run format`   | Prettier format               |
| `npm run check`    | Run lint + format check       |
| `npm run test`     | Run tests (Vitest)            |

## Deployment

Automated via GitHub Actions:

1. Push to `develop` branch
2. CI runs `npm ci` + `npm run build`
3. Built files deploy to `blog` branch via [actions-gh-pages](https://github.com/peaceiris/actions-gh-pages)
4. GitHub Pages serves from `blog` branch

## License

MIT
