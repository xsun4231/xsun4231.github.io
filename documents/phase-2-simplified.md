# 第二阶段：简化架构与核心功能开发

## 📅 阶段信息
- **阶段名称**: 简化架构与核心功能开发
- **时间范围**: 1-2周 (2025-02-10 至 2025-02-24)
- **负责人**: XSUN
- **状态**: 🟡 进行中
- **项目性质**: 100%个人使用，简化方案

## 🎯 阶段目标 (简化版)

### 核心目标
1. ✅ 创建可用的个人博客基础
2. ✅ 实现快速搜索功能
3. ✅ 实现明/暗主题切换
4. ✅ 配置自动化部署流程
5. ✅ 建立简单内容管理

### 简化原则
- **使用便利性第一** - 最简单的写作和发布流程
- **避免过度工程化** - 只实现必要功能
- **快速上线** - 2-3周内完成可用版本
- **渐进优化** - 先上线，后优化

## 📋 任务清单 (简化版)

### 任务 2.1：创建简化Next.js项目
**状态**: 🟡 进行中  
**优先级**: 高  
**预计耗时**: 1天  
**负责人**: XSUN  
**开始时间**: 2025-02-10

**任务描述**:
- 初始化Next.js项目 (简化配置)
- 配置TypeScript和Tailwind CSS
- 设置基础开发环境
- 创建必要目录结构

**交付物**:
- [ ] Next.js项目初始化完成
- [ ] TypeScript配置完成
- [ ] Tailwind CSS配置完成
- [ ] 基础目录结构创建

**简化配置**:
```bash
# 使用简化配置创建Next.js项目
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --app \
  --no-eslint \
  --import-alias "@/*" \
  --no-src-dir
```

**项目结构 (简化)**:
```
xsun-blog-simple/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 基础布局
│   ├── page.tsx           # 首页
│   └── blog/              # 博客页面
├── components/            # 必要组件
│   ├── Search.tsx        # 搜索组件
│   └── ThemeToggle.tsx   # 主题切换组件
├── content/              # 内容管理
│   └── blog/            # Markdown文章
├── public/              # 静态资源
└── package.json         # 项目配置
```

---

### 任务 2.2：配置基础布局和样式
**状态**: 🔴 未开始  
**优先级**: 高  
**预计耗时**: 1天  
**负责人**: XSUN

**任务描述**:
- 创建基础布局组件
- 配置简化设计系统
- 实现响应式设计
- 设置全局样式

**交付物**:
- [ ] 基础布局组件完成
- [ ] 简化设计系统配置
- [ ] 响应式设计实现
- [ ] 全局样式文件创建

**简化设计系统**:
```css
/* 简化色彩系统 */
:root {
  /* 明色主题 */
  --bg: #ffffff;
  --text: #1a1a1a;
  --primary: #2563eb;
  --border: #e5e7eb;
}

.dark {
  /* 暗色主题 */
  --bg: #0f172a;
  --text: #f8fafc;
  --primary: #3b82f6;
  --border: #374151;
}
```

**基础布局组件**:
```typescript
// 简化布局组件
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="bg-[var(--bg)] text-[var(--text)]">
        <header className="border-b border-[var(--border)]">
          <nav className="container mx-auto px-4 py-4">
            {/* 导航、搜索、主题切换 */}
          </nav>
        </header>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="border-t border-[var(--border)] py-8">
          {/* 简单页脚 */}
        </footer>
      </body>
    </html>
  );
}
```

---

### 任务 2.3：实现快速搜索功能
**状态**: 🔴 未开始  
**优先级**: 高  
**预计耗时**: 1天  
**负责人**: XSUN

**任务描述**:
- 实现客户端简单搜索
- 基于标题和标签过滤
- 实时搜索结果显示
- 优化搜索用户体验

**交付物**:
- [ ] 搜索组件完成
- [ ] 搜索功能实现
- [ ] 搜索结果展示
- [ ] 搜索体验优化

**简化搜索实现**:
```typescript
// 简单搜索组件
'use client';

import { useState } from 'react';

interface Post {
  slug: string;
  title: string;
  date: string;
  tags?: string[];
}

export function SimpleSearch({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState('');
  
  const filteredPosts = posts.filter(post => {
    const searchText = query.toLowerCase();
    return (
      post.title.toLowerCase().includes(searchText) ||
      post.tags?.some(tag => tag.toLowerCase().includes(searchText))
    );
  });
  
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="搜索文章..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
      
      {query && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border rounded-lg shadow-lg">
          {filteredPosts.length > 0 ? (
            <ul className="py-2">
              {filteredPosts.map(post => (
                <li key={post.slug} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <a href={`/blog/${post.slug}`} className="block">
                    <div className="font-medium">{post.title}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {post.date} • {post.tags?.join(', ')}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-2 text-gray-500 dark:text-gray-400">
              没有找到相关文章
            </div>
          )}
        </div>
      )}
    </div>
  );
}
```

---

### 任务 2.4：实现明/暗主题切换
**状态**: 🔴 未开始  
**优先级**: 高  
**预计耗时**: 1天  
**负责人**: XSUN

**任务描述**:
- 实现主题切换功能
- 保存用户主题偏好
- 支持系统主题检测
- 平滑主题切换动画

**交付物**:
- [ ] 主题切换组件完成
- [ ] 主题持久化实现
- [ ] 系统主题检测
- [ ] 切换动画优化

**主题切换实现**:
```typescript
'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // 从localStorage读取主题偏好
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label={`切换到${theme === 'light' ? '深色' : '浅色'}主题`}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
}
```

---

### 任务 2.5：配置GitHub Actions自动化部署
**状态**: 🔴 未开始  
**优先级**: 高  
**预计耗时**: 1天  
**负责人**: XSUN

**任务描述**:
- 配置GitHub Actions工作流
- 设置develop到blog分支的自动部署
- 配置Next.js构建和部署
- 测试自动化部署流程

**交付物**:
- [ ] GitHub Actions配置完成
- [ ] 自动化部署流程测试
- [ ] 部署文档创建
- [ ] 错误处理配置

**GitHub Actions配置**:
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [develop]
  workflow_dispatch:  # 允许手动触发

permissions:
  contents: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
          
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to blog branch
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
          publish_branch: blog
          user_name: 'github-actions[bot]'
          user_email: 'github-actions[bot]@users.noreply.github.com'
```

**package.json构建脚本**:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "export": "next build && next export",
    "deploy": "npm run export && gh-pages -d out -b blog"
  }
}
```

---

### 任务 2.6：建立简单内容结构
**状态**: 🔴 未开始  
**优先级**: 中  
**预计耗时**: 2天  
**负责人**: XSUN

**任务描述**:
- 创建简单内容管理结构
- 配置Markdown解析
- 建立文章索引系统
- 实现基础博客功能

**交付物**:
- [ ] 内容结构创建完成
- [ ] Markdown解析配置
- [ ] 文章索引系统
- [ ] 博客功能实现

**内容结构**:
```
content/
├── blog/
│   ├── 2025/
│   │   └── hello-world.md
│   ├── 2022/
│   │   └── python-yield.md
│   └── _index.json
└── config.json
```

**Markdown文章格式**:
```markdown
---
title: "文章标题"
date: "2025-02-01"
description: "文章描述"
tags: ["标签1", "标签2"]
category: "技术"
draft: false
---

# 文章内容

这里是文章正文...

```python
# 代码示例
def hello():
    print("Hello World")
```
```

**文章索引**:
```typescript
// 简单文章索引
export async function getPosts() {
  // 从content/blog目录读取所有Markdown文件
  // 解析Front Matter
  // 按日期排序
  // 返回文章列表
}
```

---

## 📊 进度跟踪

### 当前进度
- **总体进度**: 10%
- **开始时间**: 2025-02-10
- **预计完成**: 2025-02-24
- **实际完成**: -

### 任务完成情况
| 任务 | 状态 | 开始时间 | 完成时间 | 备注 |
|------|------|----------|----------|------|
| 2.1 创建简化Next.js项目 | 🟡 进行中 | 2025-02-10 | - | - |
| 2.2 配置基础布局和样式 | 🔴 未开始 | - | - | - |
| 2.3 实现快速搜索功能 | 🔴 未开始 | - | - | - |
| 2.4 实现明/暗主题切换 | 🔴 未开始 | - | - | - |
| 2.5 配置GitHub Actions | 🔴 未开始 | - | - | - |
| 2.6 建立简单内容结构 | 🔴 未开始 | - | - | - |

### 每日进度记录

#### 2025-02-10 (周一)
- [ ] 开始第二阶段工作
- [ ] 创建阶段管理文档
- [ ] 更新主开发计划
- [ ] 开始任务2.1：创建简化Next.js项目

#### 2025-02-11 (周二)
- [ ] 完成任务2.1
- [ ] 开始任务2.2：配置基础布局和样式

#### 2025-02-12 (周三)
- [ ] 完成任务2.2
- [ ] 开始任务2.3：实现快速搜索功能

#### 2025-02-13 (周四)
- [ ] 完成任务2.3
- [ ] 开始任务2.4：实现明/暗主题切换

#### 2025-02-14 (周五)
- [ ] 完成任务2.4
- [ ] 开始任务2.5：配置GitHub Actions

#### 2025-02-17 (周一)
- [ ] 完成任务2.5
- [ ] 开始任务2.6：建立简单内容结构

#### 2025-02-18 (周二)
- [ ] 完成任务2.6
- [ ] 集成测试和优化

#### 2025-02-19 (周三)
- [ ] 部署测试
- [ ] 问题修复
- [ ] 第二阶段总结

---

## 🎯 简化原则检查

### 每个任务必须符合：
1. ✅ **使用便利性** - 是否简化了使用流程？
2. ✅ **避免过度工程化** - 是否只实现了必要功能？
3. ✅ **快速上线** - 是否能在2-3周内完成？
4. ✅ **渐进优化** - 是否支持后续优化？

### 功能优先级：
**P0 (必须完成)**:
- 基础博客功能
- 快速搜索
- 明/暗主题
- 自动化部署

**P1 (应该完成)**:
- 响应式设计
- 代码高亮
- 简单分类
- 基础SEO

**P2 (可以后续)**:
- 评论系统
- 高级搜索
- 复杂分类
- 分析统计

---

## 📝 决策记录

### 重要决策
| 决策事项 | 选项 | 选择 | 理由 | 决策时间 |
|----------|------|------|------|----------|
| 项目复杂度 | 完整方案 / 简化方案 | 简化方案 | 100%个人使用，使用便利性第一 | 2025-02-10 |
| 部署流程 | 复杂CI/CD / 简单GitHub Actions | 简单GitHub Actions | develop→blog分支自动部署足够 | 2025-02-10 |
| 搜索实现 | 服务端搜索 / 客户端搜索 | 客户端搜索 | 个人使用，数据量小，简单实现即可 | 2025-02-10 |

### 待决策事项
1. 是否保留所有81篇文章？ (用户已选择：全部迁移并优化)
2. 是否需要评论系统？ (建议：个人使用可能不需要)
3. 是否需要多语言支持？ (建议：个人使用可能不需要)

---

## 🔧 技术参考

### 简化技术栈
```yaml
前端框架: Next.js 14.x (App Router)
样式方案: Tailwind CSS 3.x (基础配置)
开发语言: TypeScript 5.x
构建工具: Next.js内置
部署平台: GitHub Pages
自动化: GitHub Actions
```

### 开发环境
```bash
# 必需工具
Node.js: >= 18.0.0
npm/pnpm: 最新版本
Git: >= 2.30.0

# 推荐编辑器
VS Code + 扩展:
  - TypeScript扩展
  - Tailwind CSS IntelliSense
  - Prettier
```

### 项目初始化命令
```bash
# 创建简化Next.js项目
npx create-next-app@latest xsun-blog-simple \
  --typescript \
  --tailwind \
  --app \
  --no-eslint \
  --import-alias "@/*" \
  --no-src-dir

cd xsun-blog-simple

# 安装必要依赖
npm install lucide-react date-fns gray-matter remark remark-html
```

---

## ⚠️ 简化风险评估

### 技术风险
| 风险 | 可能性 | 影响 | 缓解措施 |
|------|--------|------|----------|
| 内容迁移复杂度 | 中 | 中 | 先迁移部分测试，渐进优化 |
| 部署配置问题 | 低 | 中 | 详细测试GitHub Actions |
| 性能问题 | 低 | 低 | Next.js基础优化足够 |

### 时间风险
| 风险 | 可能性 | 影响 | 缓解措施 |
|------|--------|------|----------|
| 功能范围蔓延 | 中 | 中 | 严格遵循简化原则 |
| 技术问题 | 低 | 低 | 选择成熟技术栈 |
| 内容处理耗时 | 中 | 中 | 分批处理，先核心后优化 |

### 质量风险
| 风险 | 可能性 | 影响 | 缓解措施 |
|------|--------|------|----------|
| 用户体验问题 | 低 | 低 | 个人使用，可后续优化 |
| 浏览器兼容性 | 低 | 低 | 使用现代特性，基础降级 |
| 可访问性问题 | 中 | 低 | 基础可访问性支持 |

---

## 📁 文档链接

### 相关文档
- [主开发计划](../new-site-plan.md)
- [简化需求分析](../simplified-requirements.md)
- [第一阶段管理文档](../phase-1-planning.md)

### 外部参考
- [Next.js文档](https://nextjs.org/docs)
- [Tailwind CSS文档](https://tailwindcss.com/docs)
- [GitHub Actions文档](https://docs.github.com/en/actions)

---

## 🔄 更新记录

| 版本 | 日期 | 更新内容 | 更新人 |
|------|------|----------|--------|
| v1.0 | 2025-02-10 | 创建第二阶段简化管理文档 | XSUN |
| v1.1 | - | 更新任务进度 | - |

---

**最后更新**: 2025-02-10  
**下一阶段**: 第三阶段 - 内容迁移与优化 (简化版)