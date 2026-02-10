import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default async function Home() {
  const posts = await getAllPosts()
  const latestPosts = posts.slice(0, 5)

  return (
    <div className="space-y-24">
      <section className="space-y-6 py-8">
        <h1 className="text-6xl font-bold tracking-tight">XSun</h1>
        <p className="text-2xl text-foreground/60 max-w-2xl">
          Building elegant solutions through clean code and thoughtful design
        </p>
      </section>

      <section className="space-y-12">
        <div className="flex items-baseline justify-between">
          <h2 className="text-3xl font-bold">Recent Writing</h2>
          <Link 
            href="/blog" 
            className="text-sm border-b border-foreground/20 hover:border-foreground/60 transition-colors pb-0.5"
          >
            View all posts
          </Link>
        </div>
        
        <div className="space-y-0">
          {latestPosts.length === 0 ? (
            <p className="text-foreground/40 py-8">No posts yet. Coming soon...</p>
          ) : (
            latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <article className="space-y-3 py-8 border-b border-foreground/10 last:border-0">
                  <div className="flex items-center gap-3 text-sm text-foreground/40">
                    <time>{post.date}</time>
                    {post.tags.length > 0 && (
                      <span className="flex gap-2">
                        {post.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="px-2 py-0.5 border border-foreground/20 text-xs">
                            {tag}
                          </span>
                        ))}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-semibold group-hover:text-foreground/60 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-foreground/60 leading-relaxed">{post.excerpt}</p>
                </article>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  )
}
