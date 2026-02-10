#!/usr/bin/env node

/**
 * Content Migration Script
 * 
 * This script helps migrate content from the old Hexo blog to the new Next.js blog.
 * It converts Hexo markdown files to the new format.
 */

const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const OLD_CONTENT_DIR = '/home/xsun/xsun4231.github.io/source/_posts'
const NEW_CONTENT_DIR = '/home/xsun/xsun-blog-simple/content/posts'

function convertHexoFrontmatter(oldFrontmatter) {
  const newFrontmatter = {
    title: oldFrontmatter.title || 'Untitled',
    date: oldFrontmatter.date ? new Date(oldFrontmatter.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    excerpt: oldFrontmatter.excerpt || oldFrontmatter.description || '',
    tags: Array.isArray(oldFrontmatter.tags) ? oldFrontmatter.tags : 
          oldFrontmatter.tag ? [oldFrontmatter.tag] : 
          oldFrontmatter.categories ? [oldFrontmatter.categories] : [],
  }

  newFrontmatter.tags = newFrontmatter.tags
    .filter(tag => tag && typeof tag === 'string')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0)

  return newFrontmatter
}

function estimateReadTime(content) {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

function migratePost(oldFilePath) {
  try {
    const content = fs.readFileSync(oldFilePath, 'utf8')
    const { data: frontmatter, content: markdownContent } = matter(content)
    
    const newFrontmatter = convertHexoFrontmatter(frontmatter)
    newFrontmatter.readTime = estimateReadTime(markdownContent)
    
    const filename = path.basename(oldFilePath, '.md')
    const slug = filename.replace(/^\d{4}-\d{2}-\d{2}-/, '')
    
    const newContent = matter.stringify(markdownContent, newFrontmatter)
    
    const newFilePath = path.join(NEW_CONTENT_DIR, `${slug}.md`)
    fs.writeFileSync(newFilePath, newContent)
    
    console.log(`✓ Migrated: ${slug}`)
    return { slug, title: newFrontmatter.title }
  } catch (error) {
    console.error(`✗ Error migrating ${oldFilePath}:`, error.message)
    return null
  }
}

function main() {
  console.log('Starting content migration...')
  console.log(`Source: ${OLD_CONTENT_DIR}`)
  console.log(`Destination: ${NEW_CONTENT_DIR}`)
  
  if (!fs.existsSync(NEW_CONTENT_DIR)) {
    fs.mkdirSync(NEW_CONTENT_DIR, { recursive: true })
  }
  
  let oldFiles = []
  try {
    oldFiles = fs.readdirSync(OLD_CONTENT_DIR)
      .filter(file => file.endsWith('.md'))
      .map(file => path.join(OLD_CONTENT_DIR, file))
  } catch (error) {
    console.error('Error reading old content directory:', error.message)
    process.exit(1)
  }
  
  console.log(`Found ${oldFiles.length} posts to migrate`)
  
  const results = []
  for (const oldFile of oldFiles) {
    const result = migratePost(oldFile)
    if (result) {
      results.push(result)
    }
  }
  
  const report = {
    totalPosts: oldFiles.length,
    migratedPosts: results.length,
    failedPosts: oldFiles.length - results.length,
    migratedSlugs: results.map(r => r.slug),
    samplePosts: results.slice(0, 5).map(r => ({ slug: r.slug, title: r.title }))
  }
  
  const reportPath = path.join(NEW_CONTENT_DIR, 'migration-report.json')
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
  
  console.log('\nMigration completed!')
  console.log(`Total: ${report.totalPosts}`)
  console.log(`Success: ${report.migratedPosts}`)
  console.log(`Failed: ${report.failedPosts}`)
  console.log(`\nReport saved to: ${reportPath}`)
  
  if (report.samplePosts.length > 0) {
    console.log('\nSample migrated posts:')
    report.samplePosts.forEach(post => {
      console.log(`  - ${post.title} (${post.slug})`)
    })
  }
  
  console.log('\nNext steps:')
  console.log('1. Review migrated posts in', NEW_CONTENT_DIR)
  console.log('2. Update the posts.ts utility to read from markdown files')
  console.log('3. Test the blog with real content')
}

if (require.main === module) {
  main()
}

module.exports = { convertHexoFrontmatter, estimateReadTime, migratePost }