import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async context => {
  const posts = await getCollection('blog');
  const sortedPosts = posts
    .filter(post => !post.data.draft)
    .sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());

  return rss({
    title: 'XSun Blog',
    description: 'Personal blog about web development, technology, and programming',
    site: context.site?.toString() || 'https://xsun4231.github.io',
    items: sortedPosts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: `/blog/${post.id}/`,
    })),
    customData: '<language>zh-CN</language>',
  });
};
