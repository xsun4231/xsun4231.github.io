---
title: "Tailwind CSS Tips and Tricks"
date: "2024-01-05"
excerpt: "Practical tips for using Tailwind CSS effectively in your projects."
tags: ["Tailwind CSS", "CSS", "Frontend"]
---

# Tailwind CSS Tips and Tricks

Tailwind CSS is a utility-first CSS framework that makes styling fast and consistent.

## Organize with @layer

Use `@layer` to organize your custom styles:

```css
@layer components {
  .btn {
    @apply px-4 py-2 rounded;
  }
}
```

## Use Arbitrary Values

Need a specific value? Use square brackets:

```html
<div class="w-[137px] h-[42px]">
  Custom dimensions
</div>
```

## Configure Your Theme

Extend the default theme in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: '#0070f3',
      },
    },
  },
}
```

## Responsive Design

Mobile-first responsive design with breakpoint prefixes:

```html
<div class="text-sm md:text-base lg:text-lg">
  Responsive text
</div>
```

## Dark Mode

Implement dark mode with the `dark:` variant:

```html
<div class="bg-white dark:bg-black">
  Adapts to theme
</div>
```

## Conclusion

Tailwind CSS enables rapid development while maintaining design consistency.
