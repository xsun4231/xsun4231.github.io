/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    include: ['src/__tests__/**/*.{test,spec}.{js,ts}'],
    environment: 'node',
  },
});
