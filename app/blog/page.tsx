import Link from 'next/link'
import { getAllPosts, getAllTags } from '@/lib/posts'

export default async function BlogPage() {
  const posts = await getAllPosts()
  const tags = await getAllTags()

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Blog</h1>
        <p className="text-foreground/60">
          {posts.length} posts about technology and programming
        </p>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm border border-foreground/20"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="space-y-0">
        {posts.map((post) => (
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
