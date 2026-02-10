#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const SOURCE_DIR = path.join(__dirname, '../source/_posts');
const TARGET_DIR = path.join(__dirname, '../content/posts');

function slugify(filename) {
  return filename
    .replace(/^\d{4}-\d{2}-\d{2}-/, '')
    .replace(/\.md$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function extractDateFromFilename(filename) {
  const match = filename.match(/^(\d{4})-(\d{2})-(\d{2})-/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return new Date().toISOString().split('T')[0];
}

function convertHexoToNextjs(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const { data, content: markdownContent } = matter(content);
  
  const filename = path.basename(filePath);
  const slug = slugify(filename);
  const date = data.date 
    ? new Date(data.date).toISOString().split('T')[0]
    : extractDateFromFilename(filename);
  
  const tags = Array.isArray(data.tags) 
    ? data.tags 
    : (data.tags ? [data.tags] : []);
  
  const excerpt = markdownContent
    .split('\n')
    .find(line => line.trim() && !line.startsWith('#') && !line.startsWith('>'))
    ?.slice(0, 150) || '';

  const newFrontMatter = {
    title: data.title || 'Untitled',
    date: date,
    excerpt: excerpt,
    tags: tags.filter(tag => tag && tag !== 'null'),
    category: data.category || data.categories?.[0] || 'Technology'
  };

  const newContent = matter.stringify(markdownContent, newFrontMatter);
  
  return {
    slug,
    content: newContent,
    originalPath: filePath
  };
}

function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function migrateAllPosts() {
  console.log('🚀 Starting Hexo to Next.js migration...\n');
  
  ensureDirectoryExists(TARGET_DIR);
  
  const files = fs.readdirSync(SOURCE_DIR)
    .filter(file => file.endsWith('.md'));
  
  console.log(`📁 Found ${files.length} markdown files\n`);
  
  let successCount = 0;
  let errorCount = 0;
  const errors = [];
  
  files.forEach((file, index) => {
    try {
      const sourcePath = path.join(SOURCE_DIR, file);
      const { slug, content, originalPath } = convertHexoToNextjs(sourcePath);
      const targetPath = path.join(TARGET_DIR, `${slug}.md`);
      
      fs.writeFileSync(targetPath, content, 'utf8');
      successCount++;
      
      console.log(`✅ [${index + 1}/${files.length}] ${file} → ${slug}.md`);
    } catch (error) {
      errorCount++;
      errors.push({ file, error: error.message });
      console.error(`❌ [${index + 1}/${files.length}] ${file} - Error: ${error.message}`);
    }
  });
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 Migration Summary:');
  console.log('='.repeat(60));
  console.log(`✅ Success: ${successCount} files`);
  console.log(`❌ Failed:  ${errorCount} files`);
  console.log(`📁 Target:  ${TARGET_DIR}`);
  
  if (errors.length > 0) {
    console.log('\n⚠️  Errors:');
    errors.forEach(({ file, error }) => {
      console.log(`   - ${file}: ${error}`);
    });
  }
  
  console.log('\n✨ Migration completed!\n');
}

if (require.main === module) {
  migrateAllPosts();
}

module.exports = { migrateAllPosts, convertHexoToNextjs };
