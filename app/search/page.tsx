import { Search } from 'lucide-react'
import PostList from '@/components/post-list'
import { getPosts } from '@/lib/posts'

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams
  const query = q || ''
  const allPosts = await getPosts()

  let searchResults = allPosts
  let searchMessage = ''

  if (query.trim()) {
    const searchQuery = query.toLowerCase()
    searchResults = allPosts.filter(post => {
      const searchableText = `
        ${post.title.toLowerCase()}
        ${post.excerpt.toLowerCase()}
        ${post.tags.join(' ').toLowerCase()}
      `

      return searchableText.includes(searchQuery)
    })

    if (searchResults.length === 0) {
      searchMessage = `No posts found for "${query}"`
    } else {
      searchMessage = `Found ${searchResults.length} post${searchResults.length !== 1 ? 's' : ''} for "${query}"`
    }
  } else {
    searchMessage = 'Enter a search term to find posts'
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10">
            <Search className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold">Search</h1>
          
          {query ? (
            <div className="space-y-2">
              <p className="text-lg text-muted-foreground">
                {searchMessage}
              </p>
              <p className="text-sm text-muted-foreground">
                Showing results for: <span className="font-medium text-foreground">"{query}"</span>
              </p>
            </div>
          ) : (
            <p className="text-lg text-muted-foreground">
              {searchMessage}
            </p>
          )}
        </div>

        {query && (
          <div className="space-y-6">
            <PostList posts={searchResults} />
            
            {searchResults.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  Try searching with different keywords or browse all posts
                </p>
                <a
                  href="/"
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                >
                  Browse all posts
                </a>
              </div>
            )}
          </div>
        )}

        {!query && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="border rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold">Search Tips</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Use specific keywords related to your topic</li>
                <li>• Try different variations of your search terms</li>
                <li>• Search by tags like "Next.js" or "TypeScript"</li>
                <li>• Use the archive page to browse by date</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold">Popular Topics</h3>
              <div className="flex flex-wrap gap-2">
                {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'GitHub Actions'].map((tag) => (
                  <a
                    key={tag}
                    href={`/search?q=${encodeURIComponent(tag)}`}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="border rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <div className="space-y-2">
                <a href="/archive" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Browse by date in Archive
                </a>
                <a href="/tags" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Explore topics in Tags
                </a>
                <a href="/" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                  View latest posts
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}