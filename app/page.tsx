import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default async function Home() {
  const posts = await getAllPosts()
  const latestPosts = posts.slice(0, 5)

  return (
    <div className="space-y-16">
      <section className="space-y-4">
        <h1 className="text-5xl font-bold tracking-tight">XSun</h1>
        <p className="text-xl text-foreground/60">
          Software developer, tech enthusiast
        </p>
      </section>

      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Latest Posts</h2>
          <Link href="/blog" className="text-sm hover:text-foreground/60 transition-colors">
            View all →
          </Link>
        </div>
        
        <div className="space-y-6">
          {latestPosts.length === 0 ? (
            <p className="text-foreground/40">No posts yet. Coming soon...</p>
          ) : (
            latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <article className="space-y-2 py-4 border-b border-foreground/10 last:border-0">
                  <h3 className="text-lg font-medium group-hover:text-foreground/60 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-foreground/60">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-foreground/40">
                    <time>{post.date}</time>
                    {post.tags.length > 0 && (
                      <span>· {post.tags.join(', ')}</span>
                    )}
                  </div>
                </article>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  )
}
