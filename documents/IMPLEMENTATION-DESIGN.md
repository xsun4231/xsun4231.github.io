# XSun Blog - 实装设计文档

> **文档版本**: v1.0  
> **最后更新**: 2026-02-10  
> **状态**: 实装进行中

---

## 📐 系统架构

### 技术栈全景

```
┌─────────────────────────────────────────────────────┐
│                   Browser (用户端)                    │
│  - Chrome/Firefox/Safari/Edge (最新2个版本)          │
│  - Mobile Safari/Chrome (iOS/Android)               │
└─────────────────────────────────────────────────────┘
                         ↓↑ HTTPS
┌─────────────────────────────────────────────────────┐
│              GitHub Pages (CDN + Hosting)            │
│  - Static HTML/CSS/JS                               │
│  - Global CDN                                       │
│  - HTTPS by default                                 │
└─────────────────────────────────────────────────────┘
                         ↑ Deploy
┌─────────────────────────────────────────────────────┐
│              GitHub Actions (CI/CD)                  │
│  1. Checkout code (develop branch)                  │
│  2. Setup Node.js 20                                │
│  3. npm ci (install dependencies)                   │
│  4. npm run build (Next.js build)                   │
│  5. npm run export (static export)                  │
│  6. Deploy to GitHub Pages                          │
└─────────────────────────────────────────────────────┘
                         ↑ Push
┌─────────────────────────────────────────────────────┐
│              Local Development                       │
│  - Next.js 14 (App Router)                          │
│  - TypeScript 5.x                                   │
│  - Tailwind CSS 3.x                                 │
│  - React 19.x                                       │
└─────────────────────────────────────────────────────┘
```

---

## 🗂️ 目录结构详解

### 应用层 (app/)

```typescript
app/
├── layout.tsx              // 根布局 - 全局 HTML 结构
│   └── 功能: ThemeProvider, Header, Footer
│
├── page.tsx                // 首页 - 个人简介 + 最新文章
│   └── 功能: 搜索栏, 文章列表
│
├── about/
│   └── page.tsx           // 关于页面 - 个人介绍
│
├── archive/
│   └── page.tsx           // 归档页面 - 按年份归档
│
├── tags/
│   └── page.tsx           // 标签页面 - 按标签分类
│
├── search/
│   └── page.tsx           // 搜索结果页面
│
├── posts/[slug]/
│   └── page.tsx           // 文章详情页 - 动态路由
│       └── 功能: Markdown 渲染, 代码高亮, TOC
│
└── api/
    └── search/
        └── route.ts       // 搜索 API - 服务端搜索
```

### 组件层 (components/)

```typescript
components/
├── header.tsx             // 网站头部
│   └── 功能: 导航菜单, 主题切换, 搜索图标, 移动端菜单
│
├── footer.tsx             // 网站底部
│   └── 功能: 版权信息, 社交链接
│
├── search-bar.tsx         // 搜索栏组件
│   └── 功能: 输入框, Ctrl+K 快捷键, 搜索跳转
│
├── post-list.tsx          // 文章列表组件
│   └── 功能: 文章卡片, 分页, 过滤
│
├── theme-provider.tsx     // 主题提供者
│   └── 功能: next-themes 封装
│
└── ui/                    // UI 组件库 (shadcn/ui)
    ├── button.tsx         // 按钮组件
    └── input.tsx          // 输入框组件
```

### 工具层 (lib/)

```typescript
lib/
├── posts.ts               // 文章处理工具
│   ├── getPosts()        // 获取所有文章
│   ├── getPostBySlug()   // 获取单篇文章
│   ├── getPostsByTag()   // 按标签获取
│   └── getPostsByYear()  // 按年份获取
│
└── utils.ts               // 通用工具函数
    ├── cn()              // className 合并
    └── formatDate()      // 日期格式化
```

### 内容层 (content/)

```typescript
content/
└── posts/                 // Markdown 文章目录
    ├── welcome.md
    ├── nextjs-setup-guide.md
    └── ...                // 81 篇历史文章 (待迁移)
```

---

## 🎨 样式系统设计

### Tailwind CSS 配置

```typescript
// tailwind.config.ts
export default {
  darkMode: 'class',        // 基于 class 的暗色模式
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // 使用 CSS Variables 实现主题切换
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: 'hsl(var(--primary))',
        // ...更多颜色定义
      },
    },
  },
}
```

### 全局样式 (globals.css)

```css
/* 颜色变量 - Light Mode */
:root {
  --background: 0 0% 100%;      /* 白色背景 */
  --foreground: 222 47% 11%;    /* 深色文字 */
  --primary: 221 83% 53%;       /* 主题蓝色 */
  /* ...更多变量 */
}

/* 颜色变量 - Dark Mode */
.dark {
  --background: 222 47% 11%;    /* 深色背景 */
  --foreground: 210 40% 98%;    /* 浅色文字 */
  --primary: 217 91% 60%;       /* 更亮的蓝色 */
  /* ...更多变量 */
}
```

---

## 🔧 核心功能实现

### 1. 主题切换系统

**实现方案**: next-themes

```typescript
// components/theme-provider.tsx
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function ThemeProvider({ children }) {
  return (
    <NextThemesProvider
      attribute="class"          // 使用 class 切换主题
      defaultTheme="system"      // 默认跟随系统
      enableSystem               // 启用系统检测
      disableTransitionOnChange  // 禁用切换动画
    >
      {children}
    </NextThemesProvider>
  )
}
```

**主题切换组件**:

```typescript
// components/header.tsx (部分)
import { useTheme } from 'next-themes'

const { theme, setTheme } = useTheme()

const toggleTheme = () => {
  setTheme(theme === 'dark' ? 'light' : 'dark')
}

// 渲染: Sun/Moon 图标
```

**特性**:
- ✅ 自动检测系统偏好
- ✅ 本地存储用户选择
- ✅ 无闪烁切换
- ✅ SSR 友好

---

### 2. 搜索功能

**实现方案**: 客户端搜索 (Phase 2) → 可选服务端搜索 (Phase 3)

**搜索栏组件**:

```typescript
// components/search-bar.tsx
export default function SearchBar() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  // Ctrl+K 快捷键
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        // 聚焦搜索框
      }
    }
    // ...
  }, [])

  // 搜索提交
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <form onSubmit={handleSearch}>
      <Input placeholder="Search posts... (Ctrl+K)" />
      <Button>Search</Button>
    </form>
  )
}
```

**搜索页面**:

```typescript
// app/search/page.tsx
export default function SearchPage({ searchParams }) {
  const query = searchParams.q
  const posts = await getPosts()
  
  // 客户端过滤
  const results = posts.filter(post => 
    post.title.toLowerCase().includes(query.toLowerCase()) ||
    post.tags?.some(tag => tag.toLowerCase().includes(query))
  )

  return <PostList posts={results} />
}
```

**特性**:
- ✅ Ctrl+K 快捷键
- ✅ 实时搜索
- ✅ 标题 + 标签搜索
- ⏳ 待实现: 全文搜索

---

### 3. 文章管理系统

**当前实现** (Phase 2):

```typescript
// lib/posts.ts
export async function getPosts(): Promise<Post[]> {
  // 暂时返回示例数据
  return getSamplePosts()
}

function getSamplePosts(): Post[] {
  return [
    {
      slug: 'getting-started-with-nextjs',
      title: 'Getting Started with Next.js 14',
      date: '2024-01-15',
      excerpt: '...',
      content: '...',
      tags: ['Next.js', 'React'],
      readTime: 5
    },
    // ...更多示例文章
  ]
}
```

**计划实现** (Phase 3):

```typescript
// lib/posts.ts (完整版)
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export async function getPosts(): Promise<Post[]> {
  // 1. 读取 content/posts 目录
  const fileNames = fs.readdirSync(postsDirectory)
  
  // 2. 解析每个 Markdown 文件
  const allPostsData = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    
    // 3. 解析 Front Matter
    const { data, content } = matter(fileContents)
    
    return {
      slug,
      ...data,
      content
    } as Post
  })
  
  // 4. 按日期排序
  return allPostsData.sort((a, b) => {
    return a.date < b.date ? 1 : -1
  })
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  
  // 5. Markdown 转 HTML
  const processedContent = await remark()
    .use(html)
    .process(content)
  
  return {
    slug,
    ...data,
    content: processedContent.toString()
  } as Post
}
```

**Markdown Front Matter 格式**:

```yaml
---
title: "文章标题"
date: "2024-01-01"
excerpt: "文章摘要"
tags: ["Next.js", "React"]
category: "技术"
---

# 文章内容

这里是正文...
```

---

### 4. 代码高亮 (待实现)

**方案选择**: Shiki (推荐) 或 Prism.js

**Shiki 实现** (推荐):

```typescript
// lib/markdown.ts
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeShiki from '@shikijs/rehype'
import rehypeStringify from 'rehype-stringify'

export async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeShiki, {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      }
    })
    .use(rehypeStringify)
    .process(markdown)

  return result.toString()
}
```

**特性**:
- ✅ 支持明/暗主题
- ✅ 多语言支持
- ✅ 精确的语法高亮
- ✅ 无运行时依赖

---

## 🚀 部署配置

### Next.js 配置

```javascript
// next.config.js
const nextConfig = {
  output: 'export',           // 静态导出
  basePath: '',               // 根路径 (不使用子路径)
  images: {
    unoptimized: true,        // 禁用图片优化 (静态导出要求)
  },
  trailingSlash: true,        // URL 末尾添加斜杠
}

module.exports = nextConfig
```

### GitHub Actions 工作流

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: ["develop"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Export
        run: npm run export
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/develop'
    steps:
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
```

### Package.json 脚本

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "export": "next build",
    "lint": "next lint"
  }
}
```

---

## 📦 依赖管理

### 核心依赖

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "typescript": "^5.0.0",
    
    "next-themes": "^0.3.0",      // 主题切换
    "gray-matter": "^4.0.3",      // Front Matter 解析
    "lucide-react": "^0.344.0",   // 图标库
    
    "tailwindcss": "^3.4.0",      // CSS 框架
    "tailwindcss-animate": "^1.0.7",
    
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0"
  }
}
```

### 待添加依赖 (Phase 3)

```json
{
  "dependencies": {
    // Markdown 处理
    "remark": "^15.0.0",
    "remark-html": "^16.0.0",
    "remark-gfm": "^4.0.0",        // GitHub Flavored Markdown
    
    // 代码高亮
    "@shikijs/rehype": "^1.0.0",
    "rehype-stringify": "^10.0.0",
    
    // RSS 生成
    "rss": "^1.2.2",
    
    // 日期处理
    "date-fns": "^3.0.0"
  }
}
```

---

## 🔐 性能优化

### 静态生成策略

```typescript
// app/posts/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await getPosts()
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }) {
  const post = await getPostBySlug(params.slug)
  return <PostContent post={post} />
}
```

### 图片优化

```typescript
// 使用 Next.js Image 组件
import Image from 'next/image'

<Image
  src="/images/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority
/>
```

### 代码分割

```typescript
// 动态导入
const CommentSection = dynamic(() => import('@/components/comments'), {
  loading: () => <p>Loading comments...</p>,
  ssr: false
})
```

---

## 📊 待实现功能清单

### P0 - 必须完成

- [ ] **修复 package.json** - 移除 Hexo 依赖
- [ ] **实现 Markdown 解析** - gray-matter + remark
- [ ] **添加代码高亮** - Shiki
- [ ] **文章目录 (TOC)** - 自动生成
- [ ] **阅读时间估算** - 基于字数

### P1 - 重要功能

- [ ] **RSS 订阅** - 生成 RSS feed
- [ ] **Sitemap** - 自动生成站点地图
- [ ] **SEO 优化** - Meta tags, Open Graph
- [ ] **404 页面** - 自定义 404
- [ ] **加载状态** - Skeleton loading

### P2 - 增值功能

- [ ] **评论系统** - giscus 集成
- [ ] **阅读进度** - 进度条指示
- [ ] **分享按钮** - 社交媒体分享
- [ ] **相关文章** - 智能推荐
- [ ] **访问统计** - Google Analytics

---

## 🧪 测试策略

### 开发环境测试

```bash
# 本地开发服务器
npm run dev

# 构建测试
npm run build

# 静态导出测试
npm run export
cd out && python -m http.server 8000
```

### 跨浏览器测试

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

### 性能测试

- Lighthouse (目标: 90+ 分)
- PageSpeed Insights
- WebPageTest

---

## 📚 相关资源

### 官方文档
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### 参考实现
- [Overreacted.io](https://overreacted.io) - Dan Abramov's blog
- [Lee Robinson's Blog](https://leerob.io)
- [Josh Comeau's Blog](https://joshwcomeau.com)

---

**文档维护**: 随实装进展更新  
**负责人**: XSUN  
**创建时间**: 2026-02-10
