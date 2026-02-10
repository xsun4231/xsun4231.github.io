"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
}

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [posts, setPosts] = useState<Post[]>([])
  const [results, setResults] = useState<Post[]>([])

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(() => setPosts([]))
  }, [])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const searchQuery = query.toLowerCase()
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(searchQuery) ||
      post.excerpt.toLowerCase().includes(searchQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery))
    )
    setResults(filtered)
  }, [query, posts])

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Search</h1>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts..."
          className="w-full px-4 py-3 bg-transparent border border-foreground/20 focus:border-foreground/40 outline-none transition-colors"
          autoFocus
        />
      </div>

      <div className="space-y-0">
        {query && results.length === 0 && (
          <p className="text-foreground/40 py-8">No results found</p>
        )}
        
        {results.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block group"
          >
            <article className="space-y-2 py-6 border-b border-foreground/10 last:border-0">
              <h2 className="text-xl font-medium group-hover:text-foreground/60 transition-colors">
                {post.title}
              </h2>
              <p className="text-foreground/60">{post.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-foreground/40">
                <time>{post.date}</time>
                {post.tags.length > 0 && (
                  <span>· {post.tags.join(', ')}</span>
                )}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}
