import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog');

  const searchData = posts.map(post => ({
    slug: post.id,
    title: post.data.title,
    description: post.data.description,
    tags: post.data.tags,
    publishDate: post.data.publishDate.toISOString(),
  }));

  return new globalThis.Response(JSON.stringify(searchData), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
