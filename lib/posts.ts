import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeShiki from 'rehype-shiki'
import rehypeStringify from 'rehype-stringify'

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

function calculateReadTimeInMinutes(content: string): number {
  const WORDS_PER_MINUTE = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / WORDS_PER_MINUTE)
}

export async function getPosts(): Promise<Post[]> {
  try {
    if (!fs.existsSync(postsDirectory)) {
      console.warn('Content directory does not exist, using sample posts')
      return getSamplePosts()
    }

    const fileNames = fs.readdirSync(postsDirectory)
    const markdownFiles = fileNames.filter(name => name.endsWith('.md'))

    if (markdownFiles.length === 0) {
      console.warn('No markdown files found, using sample posts')
      return getSamplePosts()
    }

    const allPostsData = await Promise.all(
      markdownFiles.map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)
        const excerpt = data.excerpt || content.slice(0, 150).trim() + '...'

        return {
          slug,
          title: data.title || 'Untitled',
          date: data.date || new Date().toISOString().split('T')[0],
          excerpt,
          content,
          tags: data.tags || [],
          readTime: calculateReadTimeInMinutes(content),
        } as Post
      })
    )

    return allPostsData.sort((a, b) => a.date < b.date ? 1 : -1)
  } catch (error) {
    console.error('Error getting posts:', error)
    return getSamplePosts()
  }
}

async function convertMarkdownToHtml(markdown: string): Promise<string> {
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeShiki, {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      }
    })
    .use(rehypeStringify)
    .process(markdown)
  
  return processedContent.toString()
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    
    if (!fs.existsSync(fullPath)) {
      const posts = getSamplePosts()
      return posts.find(post => post.slug === slug) || null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const htmlContent = await convertMarkdownToHtml(content)
    const excerpt = data.excerpt || content.slice(0, 150).trim() + '...'

    return {
      slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString().split('T')[0],
      excerpt,
      content: htmlContent,
      tags: data.tags || [],
      readTime: calculateReadTimeInMinutes(content),
    } as Post
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