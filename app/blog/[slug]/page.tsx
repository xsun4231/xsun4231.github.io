import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getAllPosts } from '@/lib/posts'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="space-y-8">
      <Link
        href="/blog"
        className="inline-block text-sm text-foreground/60 hover:text-foreground transition-colors"
      >
        ← Back to blog
      </Link>

      <header className="space-y-4">
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-foreground/60">
          <time>{post.date}</time>
          {post.tags.length > 0 && (
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 border border-foreground/20 text-xs">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      <div 
        className="prose prose-lg max-w-none
          prose-headings:font-bold prose-headings:tracking-tight
          prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
          prose-p:text-foreground/80 prose-p:leading-relaxed
          prose-a:text-foreground prose-a:underline prose-a:decoration-foreground/20
          prose-a:hover:decoration-foreground/60
          prose-code:text-foreground prose-code:bg-foreground/5 prose-code:px-1 prose-code:py-0.5
          prose-pre:bg-foreground/5 prose-pre:border prose-pre:border-foreground/10
          prose-blockquote:border-l-2 prose-blockquote:border-foreground/20 prose-blockquote:pl-4
          prose-blockquote:italic prose-blockquote:text-foreground/60
          prose-strong:font-semibold prose-strong:text-foreground
          prose-ul:list-disc prose-ol:list-decimal
          dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  )
}
