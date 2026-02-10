# XSun Personal Website - 项目开发计划

> **项目类型**: 混合型个人网站 (博客 + 简历 + 作品集)  
> **技术栈**: Next.js 14 + React 18 + TypeScript + Tailwind CSS  
> **设计风格**: 极简主义  
> **创建时间**: 2026-02-10

---

## 📋 项目概述

### 核心定位
- **个人品牌展示**: 技术能力、项目经验、个人特色
- **技术博客**: 分享学习笔记、技术文章
- **作品集**: 展示个人项目和开源贡献

### 设计理念
- **极简主义**: 简洁、清晰、专注内容
- **高性能**: 快速加载、流畅体验
- **响应式**: 完美适配各种设备
- **可访问性**: 良好的无障碍访问

---

## 🎯 功能需求

### P0 - 核心必备功能
- [x] **文章展示系统** - Markdown 文章列表和详情
- [x] **搜索功能** - 快速搜索文章内容
- [x] **标签/分类** - 文章分类管理
- [x] **暗色主题** - 明/暗主题自动切换

### P1 - 重要功能
- [ ] **个人简介页** - About Me 页面
- [ ] **项目展示** - Portfolio 作品集
- [ ] **响应式导航** - 移动端友好的导航
- [ ] **SEO 优化** - 搜索引擎优化

### P2 - 增值功能
- [ ] **RSS 订阅** - 文章 RSS feed
- [ ] **阅读统计** - 文章阅读时间估算
- [ ] **相关推荐** - 相关文章推荐
- [ ] **代码高亮** - 技术文章代码展示

---

## 🏗️ 技术架构

### 前端框架
```
Next.js 14 (App Router)
├── 静态站点生成 (SSG)
├── 服务端渲染 (SSR - 可选)
├── 图片优化
└── 自动代码分割
```

### 样式方案
```
Tailwind CSS 3.x
├── 极简设计系统
├── 响应式工具类
├── 暗色模式支持
└── 自定义配置最小化
```

### 开发语言
```
TypeScript 5.x
├── 类型安全
├── 更好的 IDE 支持
└── 代码可维护性
```

---

## 📂 项目结构（规划）

```
xsun4231.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 部署配置
├── app/
│   ├── layout.tsx              # 根布局
│   ├── page.tsx                # 首页
│   ├── about/
│   │   └── page.tsx            # 关于页面
│   ├── blog/
│   │   ├── page.tsx            # 博客列表
│   │   └── [slug]/
│   │       └── page.tsx        # 文章详情
│   ├── projects/
│   │   ├── page.tsx            # 项目列表
│   │   └── [slug]/
│   │       └── page.tsx        # 项目详情
│   └── search/
│       └── page.tsx            # 搜索页面
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # 网站头部
│   │   ├── Footer.tsx          # 网站底部
│   │   └── Navigation.tsx      # 导航组件
│   ├── ui/
│   │   ├── Button.tsx          # 按钮组件
│   │   ├── Card.tsx            # 卡片组件
│   │   └── ThemeToggle.tsx     # 主题切换
│   └── blog/
│       ├── PostCard.tsx        # 文章卡片
│       ├── PostList.tsx        # 文章列表
│       └── SearchBar.tsx       # 搜索栏
├── content/
│   ├── blog/                   # 博客文章 (Markdown)
│   └── projects/               # 项目描述
├── lib/
│   ├── posts.ts                # 文章处理工具
│   ├── projects.ts             # 项目处理工具
│   └── utils.ts                # 通用工具函数
├── public/
│   ├── images/                 # 图片资源
│   └── favicon.ico             # 网站图标
├── styles/
│   └── globals.css             # 全局样式
├── .gitignore
├── next.config.js              # Next.js 配置
├── package.json
├── tailwind.config.ts          # Tailwind 配置
├── tsconfig.json               # TypeScript 配置
└── PROJECT-PLAN.md             # 本文件
```

---

## 🎨 设计系统

### 色彩方案
```css
/* 极简主义色彩 - 明色模式 */
--background: #ffffff;
--foreground: #1a1a1a;
--primary: #000000;
--secondary: #666666;
--accent: #0070f3;
--border: #e5e5e5;

/* 极简主义色彩 - 暗色模式 */
--background: #0a0a0a;
--foreground: #ededed;
--primary: #ffffff;
--secondary: #a0a0a0;
--accent: #3291ff;
--border: #2a2a2a;
```

### 字体系统
```css
/* 主要字体 */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 
             'Roboto', 'Helvetica', 'Arial', sans-serif;

/* 代码字体 */
font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 
             'Droid Sans Mono', monospace;
```

### 间距系统
```
基础单位: 4px
常用间距: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px
```

---

## 🚀 部署流程

### Git 分支策略
```
develop (开发分支)
  ├── 日常开发
  ├── 功能测试
  └── 推送触发 GitHub Actions
      ↓
  构建 & 测试
      ↓
  部署到 blog 分支
      ↓
  GitHub Pages 自动发布
```

### GitHub Actions 工作流
```yaml
触发条件: push to develop
步骤:
  1. Checkout 代码
  2. Setup Node.js 18
  3. 安装依赖: npm ci
  4. 类型检查: npm run type-check
  5. 构建: npm run build
  6. 部署: 推送 out/ 到 blog 分支
```

---

## 📅 开发阶段

### Phase 1: 基础架构 (1-2天)
- [ ] 项目初始化: Next.js + TypeScript + Tailwind
- [ ] 基础布局: Header + Footer + Layout
- [ ] 主题系统: 明/暗主题切换
- [ ] 路由结构: 创建所有页面骨架
- [ ] GitHub Actions: 部署工作流

### Phase 2: 内容系统 (2-3天)
- [ ] Markdown 解析: 文章读取和渲染
- [ ] 博客列表页: 文章卡片展示
- [ ] 博客详情页: 文章内容渲染
- [ ] 搜索功能: 全文搜索实现
- [ ] 标签系统: 分类筛选功能

### Phase 3: 页面完善 (2-3天)
- [ ] 首页设计: 个人介绍 + 最新文章
- [ ] About 页面: 个人简介、技能、经历
- [ ] Projects 页面: 项目展示
- [ ] 响应式优化: 移动端适配
- [ ] 性能优化: 图片、代码分割

### Phase 4: 优化上线 (1-2天)
- [ ] SEO 优化: Meta tags, Sitemap
- [ ] 代码高亮: Markdown 代码块
- [ ] 测试: 跨浏览器、移动端
- [ ] 部署: 正式上线

**预计总时间**: 6-10 天

---

## 🎯 成功指标

### 性能指标
- [ ] Lighthouse 性能分数 > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] 包大小 < 200KB (首屏)

### 功能指标
- [ ] 文章搜索响应时间 < 100ms
- [ ] 主题切换无闪烁
- [ ] 移动端完美适配
- [ ] 跨浏览器兼容性 100%

---

## 📝 下一步行动

### 立即开始
1. [x] 清空现有代码
2. [x] 创建项目计划文档
3. [ ] 初始化 Next.js 项目
4. [ ] 配置 TypeScript 和 Tailwind
5. [ ] 创建基础布局组件

### 待确认
- [ ] 个人简介内容
- [ ] 首页设计细节
- [ ] 配色方案微调
- [ ] 必要的额外功能

---

## 💡 设计参考

**极简主义优秀案例**:
- https://leerob.io/ - Lee Robinson
- https://rauchg.com/ - Guillermo Rauch
- https://paco.me/ - Paco Coursey
- https://linear.app/ - Linear 设计系统

**关键特征**:
- 大量留白
- 黑白为主，点缀色彩
- 简洁的字体
- 清晰的层级关系
- 流畅的交互

---

**文档维护**: 随项目进展更新  
**创建时间**: 2026-02-10  
**最后更新**: 2026-02-10
