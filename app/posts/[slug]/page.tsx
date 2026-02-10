import { notFound } from 'next/navigation'
import { getPostBySlug, getPosts } from '@/lib/posts'
import { format } from 'date-fns'
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to posts
          </Button>
        </Link>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.date}>
                {format(new Date(post.date), 'MMMM d, yyyy')}
              </time>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{post.readTime} min read</span>
            </div>
          </div>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary text-secondary-foreground"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <div className="border-l-4 border-primary pl-4 italic text-muted-foreground mb-8">
          {post.excerpt}
        </div>
        
        <div 
          className="content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>

      <div className="mt-12 pt-8 border-t">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">Written by XSun</h3>
            <p className="text-muted-foreground">Software developer and blogger</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/">View all posts</Link>
          </Button>
        </div>
      </div>
    </article>
  )
}