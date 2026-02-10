import { getPosts } from '@/lib/posts'
import { format } from 'date-fns'
import Link from 'next/link'

export default async function ArchivePage() {
  const posts = await getPosts()
  
  // Group posts by year
  const postsByYear = posts.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear()
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(post)
    return acc
  }, {} as Record<number, typeof posts>)

  const years = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Archive</h1>
          <p className="text-lg text-muted-foreground">
            All posts organized by year
          </p>
        </div>

        <div className="space-y-12">
          {years.map((year) => (
            <div key={year} className="space-y-4">
              <h2 className="text-2xl font-bold border-b pb-2">{year}</h2>
              <div className="space-y-6">
                {postsByYear[year].map((post) => (
                  <article
                    key={post.slug}
                    className="group border-l-4 border-transparent hover:border-primary pl-4 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <Link href={`/posts/${post.slug}`}>
                          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <time dateTime={post.date} className="whitespace-nowrap">
                          {format(new Date(post.date), 'MMM d')}
                        </time>
                        <span className="whitespace-nowrap">
                          {post.readTime} min read
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-8 border-t">
          <p className="text-muted-foreground">
            Total: {posts.length} posts across {years.length} years
          </p>
        </div>
      </div>
    </div>
  )
}