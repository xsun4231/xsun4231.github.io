import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Blog collection schema
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    tags: z.array(z.string()).default([]),
    author: z.string().default('XSun'),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    coverImage: z.string().optional(),
    readingTime: z.number().optional(),
  }),
});

// Projects collection schema
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    year: z.number(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    github: z.string().url().optional(),
    demo: z.string().url().optional(),
    status: z.enum(['active', 'completed', 'archived']).default('completed'),
  }),
});

export const collections = {
  blog,
  projects,
};
