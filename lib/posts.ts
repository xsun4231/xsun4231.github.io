import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  tags: string[]
  readTime: number
}

export async function getPosts(): Promise<Post[]> {
  try {
    // For now, return sample posts
    // In production, this would read from the content directory
    return getSamplePosts()
  } catch (error) {
    console.error('Error getting posts:', error)
    return getSamplePosts()
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const posts = await getPosts()
    return posts.find(post => post.slug === slug) || null
  } catch (error) {
    console.error('Error getting post:', error)
    return null
  }
}

function getSamplePosts(): Post[] {
  return [
    {
      slug: 'getting-started-with-nextjs',
      title: 'Getting Started with Next.js 14',
      date: '2024-01-15',
      excerpt: 'Learn how to build modern web applications with Next.js 14, featuring the new App Router and server components.',
      content: '# Getting Started with Next.js 14\n\nNext.js 14 introduces exciting new features...',
      tags: ['Next.js', 'React', 'Web Development'],
      readTime: 5
    },
    {
      slug: 'tailwind-css-best-practices',
      title: 'Tailwind CSS Best Practices',
      date: '2024-01-10',
      excerpt: 'Discover best practices for using Tailwind CSS in production applications, including component patterns and performance optimizations.',
      content: '# Tailwind CSS Best Practices\n\nTailwind CSS has revolutionized how we write CSS...',
      tags: ['Tailwind CSS', 'CSS', 'Frontend'],
      readTime: 8
    },
    {
      slug: 'typescript-advanced-patterns',
      title: 'Advanced TypeScript Patterns',
      date: '2024-01-05',
      excerpt: 'Explore advanced TypeScript patterns including conditional types, mapped types, and utility types for robust type safety.',
      content: '# Advanced TypeScript Patterns\n\nTypeScript provides powerful type system features...',
      tags: ['TypeScript', 'Programming', 'Type Safety'],
      readTime: 10
    },
    {
      slug: 'building-personal-blog',
      title: 'Building a Personal Blog with Next.js',
      date: '2024-01-01',
      excerpt: 'A step-by-step guide to building a personal blog using Next.js, Markdown, and GitHub Pages deployment.',
      content: '# Building a Personal Blog with Next.js\n\nIn this tutorial, we\'ll build a personal blog...',
      tags: ['Next.js', 'Blog', 'Tutorial'],
      readTime: 12
    },
    {
      slug: 'dark-mode-implementation',
      title: 'Implementing Dark Mode in Next.js',
      date: '2023-12-28',
      excerpt: 'Learn how to implement a seamless dark mode experience in Next.js applications with system preference detection.',
      content: '# Implementing Dark Mode in Next.js\n\nDark mode has become an essential feature...',
      tags: ['Next.js', 'Dark Mode', 'UI/UX'],
      readTime: 6
    },
    {
      slug: 'github-actions-automation',
      title: 'Automating Deployments with GitHub Actions',
      date: '2023-12-25',
      excerpt: 'Set up automated deployments for your Next.js blog using GitHub Actions and GitHub Pages.',
      content: '# Automating Deployments with GitHub Actions\n\nGitHub Actions provides powerful CI/CD capabilities...',
      tags: ['GitHub Actions', 'Deployment', 'Automation'],
      readTime: 7
    }
  ]
}