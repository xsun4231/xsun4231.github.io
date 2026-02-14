---
title: "Tailwind CSS 4.x: What's New and How to Use It"
description: 'Explore the latest features and improvements in Tailwind CSS 4.x'
publishDate: 2026-02-11
tags: ['tailwind', 'css', 'frontend', 'design']
author: 'XSun'
draft: false
featured: true
coverImage: '/images/tailwind-cover.jpg'
readingTime: 6
---

# Tailwind CSS 4.x: What's New and How to Use It

Tailwind CSS 4.x brings significant improvements to the popular utility-first CSS framework. Let's explore what's new and how to make the most of these updates.

## Major Changes in Tailwind CSS 4.x

### 1. CSS Native Custom Properties

Tailwind 4.x leverages CSS custom properties (variables) more extensively, resulting in smaller CSS bundles and better performance.

### 2. Zero Configuration by Default

The framework now works out of the box with sensible defaults, reducing initial setup complexity.

### 3. Improved Performance

Faster build times and smaller output CSS through better optimization algorithms.

## Getting Started with Tailwind CSS 4.x

### Installation

```bash
npm install tailwindcss@^4.1.0
```

### Basic Configuration

```javascript
// tailwind.config.cjs
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#06b6d4',
      },
    },
  },
};
```

### Integration with Astro

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwind()],
  },
});
```

## New Features

### 1. CSS Grid Improvements

```html
<div class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
  <!-- Responsive grid without media queries -->
</div>
```

### 2. Container Queries Support

```html
<div class="@container">
  <div class="@lg:text-xl">
    <!-- Styles change based on container size -->
  </div>
</div>
```

### 3. Enhanced Color System

```html
<div class="bg-primary-500/50">
  <!-- Built-in opacity control -->
</div>
```

## Best Practices

### 1. Use Semantic Class Names

```html
<!-- Good -->
<div class="card">
  <h2 class="card-title">Title</h2>
</div>

<style>
  .card {
    @apply bg-white rounded-lg shadow-md p-6;
  }
  .card-title {
    @apply text-2xl font-bold text-gray-800;
  }
</style>
```

### 2. Leverage CSS Variables

```css
:root {
  --radius-sm: 0.5rem;
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
}

.rounded-sm {
  border-radius: var(--radius-sm);
}
```

### 3. Optimize for Performance

- Use PurgeCSS (built-in) to remove unused styles
- Enable JIT mode for faster development
- Leverage CDN for production builds

## Theme Configuration

### Customizing Colors

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
      },
    },
  },
};
```

### Adding Custom Animations

```javascript
module.exports = {
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
};
```

## Dark Mode Implementation

### Class-based Dark Mode

```html
<html class="dark">
  <body class="bg-white dark:bg-gray-900">
    <!-- Content -->
  </body>
</html>
```

### System Preference Detection

```javascript
// Detect system preference
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.classList.add('dark');
}
```

## Performance Tips

### 1. Use `@apply` Sparingly

```css
/* Avoid */
.btn {
  @apply px-4 py-2 bg-blue-500 text-white rounded;
}

/* Prefer inline classes */
<button class="px-4 py-2 bg-blue-500 text-white rounded">
  Click me
</button>
```

### 2. Optimize Build Process

```bash
# Production build
NODE_ENV=production npm run build
```

### 3. Monitor Bundle Size

Use tools like `webpack-bundle-analyzer` to identify optimization opportunities.

## Migration from Tailwind 3.x

### 1. Update Dependencies

```bash
npm uninstall tailwindcss postcss autoprefixer
npm install tailwindcss@^4.1.0
```

### 2. Update Configuration

- Remove `mode: 'jit'` (now default)
- Update plugin imports
- Check for deprecated utilities

### 3. Test Thoroughly

- Verify all styles work correctly
- Check dark mode functionality
- Test responsive behavior

## Conclusion

Tailwind CSS 4.x represents a mature, production-ready CSS framework that balances flexibility with performance. Its focus on modern CSS features and developer experience makes it an excellent choice for any project.

Whether you're building a small personal site or a large-scale application, Tailwind CSS 4.x provides the tools you need to create beautiful, responsive designs efficiently.

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind Play](https://play.tailwindcss.com)
- [Tailwind UI](https://tailwindui.com)
