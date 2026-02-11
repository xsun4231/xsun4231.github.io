# XSun Personal Website - V2 开发计划

> **技术栈**: Astro 5.x + Tailwind CSS  
> **设计方向**: 现代极简，参考优秀案例  
> **创建时间**: 2026-02-10  
> **状态**: 🚀 重新启动

---

## 🎯 项目重启原因

### 问题分析
- Next.js 方案部署失败
- 视觉效果不理想
- 需要更现代化的外观

### 新方案: Astro

#### 为什么选择 Astro？
1. **零 JS 默认输出** - 极致性能
2. **完美的静态网站** - 专为内容网站设计
3. **岛屿架构** - 需要时才加载 JS
4. **简单直观** - 更容易实现优秀设计
5. **Markdown 原生支持** - 无需额外配置

---

## 🎨 设计灵感参考

### 优秀案例
1. **https://astro.build** - Astro 官网
   - 渐变背景
   - 流畅动画
   - 现代排版

2. **https://linear.app** - Linear 官网
   - 简洁优雅
   - 细腻的阴影和间距
   - 出色的排版

3. **https://vercel.com** - Vercel 官网
   - 黑白为主
   - 精致的设计系统
   - 专业感强

### 新设计方向

#### 配色方案
```
主色调: 黑白为主
强调色: 蓝色渐变 (#3b82f6 → #06b6d4)
背景: 微妙的网格或渐变
```

#### 视觉特点
- 大胆的字体使用
- 流畅的动画过渡
- 微妙的阴影和层次
- 现代感的卡片设计
- 适度的色彩点缀

---

## 🏗️ Astro 技术架构

### 核心特性
```
Astro 5.x
├── Content Collections (类型安全的内容管理)
├── View Transitions (页面切换动画)
├── Markdown/MDX 原生支持
├── 自动图片优化
└── 零 JS 输出（默认）
```

### 项目结构
```
xsun-website/
├── src/
│   ├── pages/              # 路由页面
│   │   ├── index.astro    # 首页
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── about.astro
│   │   └── search.astro
│   ├── layouts/           # 布局模板
│   │   └── Layout.astro
│   ├── components/        # 组件
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── BlogCard.astro
│   └── content/          # 内容集合
│       └── blog/         # 博客文章
├── public/               # 静态资源
├── astro.config.mjs     # Astro 配置
└── tailwind.config.mjs  # Tailwind 配置
```

---

## 🎯 功能规划

### Phase 1: Astro 基础搭建 (1天)
- [ ] 初始化 Astro 项目
- [ ] 配置 Tailwind CSS
- [ ] 设计全新视觉系统
- [ ] 创建基础布局
- [ ] 配置 Content Collections

### Phase 2: 核心功能 (1-2天)
- [ ] 首页设计实现
- [ ] 博客文章列表
- [ ] 文章详情页
- [ ] About 页面
- [ ] 搜索功能（Pagefind）

### Phase 3: 视觉增强 (1天)
- [ ] 页面过渡动画
- [ ] 微交互效果
- [ ] 代码高亮主题
- [ ] 响应式优化

### Phase 4: 部署测试 (1天)
- [ ] GitHub Actions 配置
- [ ] 构建测试
- [ ] 部署验证
- [ ] 性能测试

---

## 🎨 新设计系统

### 配色方案（现代化）
```css
/* 基础色 */
--bg-primary: #ffffff;
--bg-secondary: #fafafa;
--text-primary: #0a0a0a;
--text-secondary: #666666;

/* 暗色模式 */
--bg-primary-dark: #0a0a0a;
--bg-secondary-dark: #1a1a1a;
--text-primary-dark: #ffffff;
--text-secondary-dark: #a0a0a0;

/* 强调色 - 蓝色渐变 */
--accent-from: #3b82f6;
--accent-to: #06b6d4;

/* 边框 */
--border-light: #e5e5e5;
--border-dark: #2a2a2a;
```

### 字体系统
```css
/* 主字体 - 优雅现代 */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

/* 代码字体 */
font-family: 'JetBrains Mono', 'Fira Code', monospace;
```

### 视觉元素
- **渐变背景**: 微妙的径向渐变
- **卡片**: 柔和阴影 + 圆角
- **按钮**: 渐变背景 + 悬停效果
- **动画**: 流畅的页面过渡

---

## 📊 Astro vs Next.js

| 特性 | Astro | Next.js |
|------|-------|---------|
| 性能 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| 学习曲线 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| 静态网站 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| 内容管理 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| 默认 JS 大小 | ~0KB | ~87KB |

**Astro 优势**:
- 更快的加载速度
- 更简单的配置
- 原生 Markdown 支持
- 更好的 SEO
- 更适合静态博客

---

## 🚀 部署流程（保持不变）

```
develop 分支 (开发)
  ↓ git push
GitHub Actions
  ↓ astro build
构建静态文件 (dist/)
  ↓ 部署
blog 分支 (GitHub Pages)
  ↓
网站上线
```

---

## 📋 下一步

1. 清空现有代码 ✅
2. 创建新开发计划
3. 初始化 Astro 项目
4. 实现全新设计
5. 部署测试

---

**创建时间**: 2026-02-10  
**目标**: 创建真正优秀的个人网站
