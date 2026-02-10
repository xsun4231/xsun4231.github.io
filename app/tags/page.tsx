import { getPosts } from '@/lib/posts'
import { Tag } from 'lucide-react'
import Link from 'next/link'

export default async function TagsPage() {
  const posts = await getPosts()
  
  // Extract all unique tags
  const allTags = posts.flatMap(post => post.tags)
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const sortedTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Tags</h1>
          <p className="text-lg text-muted-foreground">
            Browse posts by topics and categories
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {sortedTags.map(([tag, count]) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="group border rounded-lg p-4 hover:border-primary transition-colors bg-card"
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium group-hover:text-primary transition-colors">
                    {tag}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {count} post{count !== 1 ? 's' : ''}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center pt-8 border-t">
          <p className="text-muted-foreground">
            {sortedTags.length} unique tags across {posts.length} posts
          </p>
        </div>
      </div>
    </div>
  )
}