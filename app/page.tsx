import SearchBar from '@/components/search-bar'
import PostList from '@/components/post-list'
import { getPosts } from '@/lib/posts'

export default async function Home() {
  const posts = await getPosts()

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">XSun&apos;s Blog</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A personal space for sharing thoughts on technology, programming, and everything in between
        </p>
      </div>

      <SearchBar />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Latest Posts</h2>
          <span className="text-sm text-muted-foreground">
            {posts.length} posts in total
          </span>
        </div>
        
        <PostList posts={posts} />
      </div>
    </div>
  )
}