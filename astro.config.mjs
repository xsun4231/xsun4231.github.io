// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://xsun4231.github.io',
  base: '/',
  trailingSlash: 'always',

  build: {
    format: 'directory',
  },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [mdx()]
});