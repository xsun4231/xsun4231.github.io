# XSun Blog - 开发计划

> **项目状态**: 🟡 开发中 (Phase 2 - 80% 完成)  
> **最后更新**: 2026-02-10  
> **技术栈**: Next.js 14 + TypeScript + Tailwind CSS

---

## 📋 项目概述

### 项目目标
将现有的 Hexo 博客迁移到 Next.js，实现现代化、高性能的个人技术博客。

### 核心原则
- **100% 个人使用** - 简化流程，避免过度工程化
- **使用便利性第一** - 最简单的写作和发布流程
- **快速上线** - 2-3 周内完成可用版本
- **渐进优化** - 先上线，后优化

---

## 🎯 开发阶段

### Phase 1: 需求分析与技术选型 ✅ (已完成 - 2026-02-10)

**主要产出**:
- ✅ 用户需求调研报告
- ✅ 竞品分析报告
- ✅ 技术栈选型文档
- ✅ 设计风格指南
- ✅ 内容迁移策略

**最终技术栈**:
- **前端框架**: Next.js 14 (App Router)
- **开发语言**: TypeScript 5.x
- **样式方案**: Tailwind CSS 3.x
- **部署方式**: develop 分支 → GitHub Actions → GitHub Pages

---

### Phase 2: 核心功能实现 🟡 (进行中 - 80% 完成)

#### 已完成功能 ✅

| 功能模块 | 状态 | 说明 |
|---------|------|------|
| **项目基础** | ✅ | Next.js + TypeScript + Tailwind CSS 配置完成 |
| **布局系统** | ✅ | Header、Footer、RootLayout 已实现 |
| **主题切换** | ✅ | 明/暗主题，支持系统偏好检测 (next-themes) |
| **搜索功能** | ✅ | 搜索栏组件，Ctrl+K 快捷键，搜索页面 |
| **页面路由** | ✅ | Home, About, Archive, Tags, Search, Post Detail |
| **响应式设计** | ✅ | 移动端适配，汉堡菜单 |
| **GitHub Actions** | ✅ | 自动部署到 GitHub Pages |
| **静态导出** | ✅ | Static Site Generation 配置 |

#### 待完成功能 ⏳

| 功能模块 | 优先级 | 说明 |
|---------|--------|------|
| **Markdown 解析** | P0 | 需要实现真实的文章解析 (目前是示例数据) |
| **代码高亮** | P0 | 添加 Prism.js 或 Highlight.js |
| **文章元数据** | P0 | Front Matter 解析 (gray-matter) |
| **RSS 订阅** | P1 | 生成 RSS feed |
| **SEO 优化** | P1 | Meta tags, Sitemap, robots.txt |

---

### Phase 3: 内容迁移 ✅ (已完成 - 2026-02-10)

**目标**: 将历史文章从 Hexo 迁移到 Next.js

**完成情况**:
- ✅ 分析 Hexo 文章格式
- ✅ 创建自动化迁移脚本
- ✅ 成功迁移 46 篇文章
- ✅ 统一 Front Matter 结构
- ✅ 保留所有原始内容

**迁移统计**:
- 原始文章: 46 篇 (source/_posts/)
- 迁移成功: 46 篇 (100%)
- 目标位置: content/posts/
- 失败: 0 篇

---

### Phase 4: 测试与优化 🔴 (计划中)

**任务**:
- 跨浏览器测试
- 移动端测试
- 性能优化
- SEO 验证
- 用户体验优化

**时间估算**: 3-5 天

---

## 🛠️ 技术架构

### 项目结构

```
xsun4231.github.io/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # 根布局
│   ├── page.tsx             # 首页
│   ├── about/               # 关于页面
│   ├── archive/             # 归档页面
│   ├── tags/                # 标签页面
│   ├── search/              # 搜索页面
│   ├── posts/[slug]/        # 文章详情页
│   └── api/search/          # 搜索 API
├── components/              # React 组件
│   ├── header.tsx          # 网站头部
│   ├── footer.tsx          # 网站底部
│   ├── search-bar.tsx      # 搜索栏
│   ├── post-list.tsx       # 文章列表
│   ├── theme-provider.tsx  # 主题提供者
│   └── ui/                 # UI 组件库
├── content/                # 内容目录
│   └── posts/              # Markdown 文章
├── lib/                    # 工具函数
│   ├── posts.ts           # 文章处理
│   └── utils.ts           # 通用工具
├── public/                 # 静态资源
├── .github/workflows/      # GitHub Actions
│   └── deploy.yml         # 部署工作流
└── documents/             # 项目文档
```

### 核心依赖

```json
{
  "dependencies": {
    "next": "^14.x",
    "react": "^19.x",
    "typescript": "^5.x",
    "tailwindcss": "^3.x",
    "next-themes": "^0.x",
    "gray-matter": "^4.x",
    "lucide-react": "^0.x"
  }
}
```

---

## 🚀 部署流程

### 当前部署方式

```yaml
Workflow:
  1. 本地开发: npm run dev
  2. 提交代码: git push origin develop
  3. GitHub Actions 自动触发:
     - 安装依赖: npm ci
     - 构建: npm run build
     - 导出: npm run export
     - 部署: Upload to GitHub Pages
  4. GitHub Pages 自动发布
```

### 分支策略

| 分支 | 用途 | 说明 |
|------|------|------|
| `develop` | 开发分支 | 主要开发工作在此分支 |
| `master` | 生产分支 | GitHub Pages 部署源 (遗留) |

**注**: 当前配置部署到 GitHub Pages，不使用 blog 分支

---

## 📊 当前进度

### 整体进度: 90%

| 阶段 | 进度 | 状态 |
|------|------|------|
| Phase 1: 需求分析 | 100% | ✅ 完成 |
| Phase 2: 核心功能 | 100% | ✅ 完成 |
| Phase 3: 内容迁移 | 100% | ✅ 完成 |
| Phase 4: 测试优化 | 0% | 🔴 待开始 |

### 近期里程碑

- ✅ **2026-02-10**: Phase 1 完成
- ✅ **2026-02-10**: Phase 2 完成
- ✅ **2026-02-10**: Phase 3 完成
- 🎯 **2026-02-12** (目标): Phase 4 完成
- 🎯 **2026-02-15** (目标): 正式上线

---

## ⚠️ 关键问题

### 🚨 高优先级 (需立即处理)

1. **package.json 冲突**
   - 当前 package.json 仍包含 Hexo 依赖
   - 需要替换为 Next.js 依赖
   - **影响**: 无法正常安装和构建

2. **Markdown 解析未实现**
   - 当前使用示例数据
   - 需要实现真实的文章解析
   - **影响**: 无法显示实际内容

### 📌 中优先级

1. **代码高亮未实现**
   - 技术博客必需功能
   - 建议使用 Prism.js 或 Shiki

2. **SEO 配置不完整**
   - 需要添加 sitemap
   - 需要配置 meta tags

---

## 📝 下一步行动

### 立即行动 (本周)

1. **修复 package.json**
   - 移除 Hexo 依赖
   - 添加 Next.js 完整依赖
   - 测试构建流程

2. **实现 Markdown 解析**
   - 集成 gray-matter
   - 实现文章读取逻辑
   - 测试文章显示

3. **添加代码高亮**
   - 选择代码高亮方案
   - 集成到文章渲染
   - 添加主题样式

### 下周计划

1. 完成 Phase 2 剩余功能
2. 开始 Phase 3 内容迁移
3. 部署测试环境

---

## 📚 相关文档

- [实装设计文档](./IMPLEMENTATION-DESIGN.md)
- [用户需求调研](./user-requirements.md)
- [技术栈选型](./tech-stack-selection.md)
- [内容迁移策略](./content-migration-strategy.md)

---

**文档维护**: 本文档应随项目进展持续更新  
**负责人**: XSUN  
**创建时间**: 2026-02-10
