---
title: "Complete Guide to Setting Up Next.js 14"
date: "2024-01-05"
excerpt: "A comprehensive guide to setting up a Next.js 14 project with TypeScript, Tailwind CSS, and best practices."
tags: ["Next.js", "TypeScript", "Tailwind CSS", "Tutorial"]
---

Next.js 14 brings exciting new features and improvements. In this guide, I'll walk you through setting up a complete Next.js 14 project from scratch.

## Prerequisites

Before we begin, make sure you have:
- Node.js 18+ installed
- Basic knowledge of React and JavaScript/TypeScript
- A code editor (VS Code recommended)

## Step 1: Create a New Next.js Project

```bash
npx create-next-app@latest my-nextjs-app
```

During setup, choose:
- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- App Router: Yes
- Import alias: `@/*`

## Step 2: Project Structure

Here's the recommended structure for a Next.js 14 project:

```
my-nextjs-app/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── api/
├── components/
│   ├── ui/
│   └── shared/
├── lib/
├── content/
├── public/
└── types/
```

## Step 3: Essential Dependencies

Install additional useful packages:

```bash
npm install next-themes class-variance-authority clsx tailwind-merge
npm install date-fns gray-matter remark remark-html
npm install -D @types/node @types/react @types/react-dom
```

## Step 4: Configure Tailwind CSS

Update `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // Add more colors as needed
      },
    },
  },
  plugins: [],
}
export default config
```

## Step 5: Set Up Theme Provider

Create a theme provider component:

```typescript
// components/theme-provider.tsx
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

## Step 6: Configure Next.js

Update `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
```

## Step 7: Create Utility Functions

Create a utility file for common functions:

```typescript
// lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## Step 8: Set Up ESLint and Prettier

Create `.eslintrc.json`:

```json
{
  "extends": [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "warn",
    "react/no-unescaped-entities": "off"
  }
}
```

Create `.prettierrc`:

```json
{
  "semi": false,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

## Step 9: Development Scripts

Update `package.json` scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write ."
  }
}
```

## Step 10: Run and Test

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

## Best Practices

### 1. Component Organization
- Keep components small and focused
- Use TypeScript interfaces for props
- Implement proper error boundaries

### 2. Performance Optimization
- Use Next.js Image component for images
- Implement code splitting
- Use React.memo for expensive components

### 3. SEO Optimization
- Add proper meta tags
- Implement structured data
- Use semantic HTML

### 4. Security
- Validate user input
- Use environment variables for secrets
- Implement proper authentication

## Conclusion

This setup provides a solid foundation for any Next.js 14 project. The configuration includes:

- TypeScript for type safety
- Tailwind CSS for styling
- Theme switching support
- Proper project structure
- Development tools and linting

From here, you can start building your application with confidence that you have a modern, well-structured foundation.

Happy coding! 🚀