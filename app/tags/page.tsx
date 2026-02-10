import Link from 'next/link'
import { getAllPosts, getAllTags } from '@/lib/posts'

export default async function TagsPage() {
  const tags = await getAllTags()
  const posts = await getAllPosts()

  const tagCounts = tags.map(tag => ({
    tag,
    count: posts.filter(post => post.tags.includes(tag)).length
  }))

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Tags</h1>
        <p className="text-foreground/60">
          Browse posts by topic
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        {tagCounts.map(({ tag, count }) => (
          <div
            key={tag}
            className="px-4 py-2 border border-foreground/20 hover:border-foreground/40 transition-colors"
          >
            <span className="font-medium">{tag}</span>
            <span className="ml-2 text-sm text-foreground/40">({count})</span>
          </div>
        ))}
      </div>

      <div className="space-y-8">
        {tags.map(tag => {
          const tagPosts = posts.filter(post => post.tags.includes(tag))
          return (
            <section key={tag} className="space-y-4">
              <h2 className="text-xl font-semibold">{tag}</h2>
              <div className="space-y-0">
                {tagPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="block group"
                  >
                    <article className="py-4 border-b border-foreground/10 last:border-0">
                      <h3 className="font-medium group-hover:text-foreground/60 transition-colors">
                        {post.title}
                      </h3>
                      <time className="text-sm text-foreground/40">{post.date}</time>
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
