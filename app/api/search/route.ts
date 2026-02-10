import { NextRequest, NextResponse } from 'next/server'
import { getPosts } from '@/lib/posts'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')?.toLowerCase() || ''
  const limit = parseInt(searchParams.get('limit') || '10')

  try {
    const posts = await getPosts()
    
    if (!query.trim()) {
      return NextResponse.json({
        results: posts.slice(0, limit),
        total: posts.length,
        query: ''
      })
    }

    const searchResults = posts.filter(post => {
      const searchableText = `
        ${post.title.toLowerCase()}
        ${post.excerpt.toLowerCase()}
        ${post.tags.join(' ').toLowerCase()}
        ${post.content.toLowerCase()}
      `

      return searchableText.includes(query)
    })

    const limitedResults = searchResults.slice(0, limit)

    return NextResponse.json({
      results: limitedResults,
      total: searchResults.length,
      query
    })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Search failed', results: [], total: 0, query },
      { status: 500 }
    )
  }
}