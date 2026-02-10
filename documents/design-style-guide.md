# 设计风格指南

## 🎨 设计概述
- **设计理念**: 现代简约，内容优先，专注阅读体验
- **设计原则**: 一致性、可读性、可访问性、响应式
- **设计系统**: 基于Tailwind CSS的自定义设计系统
- **设计时间**: 2025-02-10
- **设计人**: XSUN
- **用户偏好**: 现代简约风格，优秀阅读体验优先

## 🎯 设计目标

### 1. 视觉目标 (基于用户偏好)
- **现代简约风格**: 干净、简洁、专注内容
- **优秀阅读体验**: 优化排版、对比度、代码展示
- **主题切换支持**: 深色/浅色主题，保护视力
- **跨设备一致性**: 响应式设计，全设备适配

### 2. 体验目标 (用户最看重)
- **阅读体验优先**: 代码高亮、响应式设计、良好排版
- **快速加载性能**: 优化首屏加载，流畅交互
- **直观内容导航**: 易于发现和阅读内容
- **无障碍访问**: 遵循WCAG标准，包容性设计

### 3. 功能目标
- **核心功能**: 优秀的文章阅读界面
- **基础功能**: 分类标签、搜索、主题切换
- **扩展功能**: 个人简介、项目展示（后续阶段）
- **优化功能**: SEO优化、性能监控、分析集成

## 🎨 设计系统

### 1. 色彩系统

#### 主色调 (Primary)
```css
/* 科技蓝 - 主品牌色 */
--color-primary-50: #eff6ff;
--color-primary-100: #dbeafe;
--color-primary-200: #bfdbfe;
--color-primary-300: #93c5fd;
--color-primary-400: #60a5fa;
--color-primary-500: #3b82f6;  /* 主色调 */
--color-primary-600: #2563eb;  /* 强调色 */
--color-primary-700: #1d4ed8;
--color-primary-800: #1e40af;
--color-primary-900: #1e3a8a;
```

#### 辅助色 (Secondary)
```css
/* 紫色 - 辅助色 */
--color-secondary-50: #faf5ff;
--color-secondary-100: #f3e8ff;
--color-secondary-500: #a855f7;
--color-secondary-600: #7c3aed;  /* 辅助强调色 */
--color-secondary-700: #6d28d9;

/* 绿色 - 成功/强调色 */
--color-success-500: #10b981;
--color-success-600: #059669;

/* 橙色 - 警告/注意色 */
--color-warning-500: #f59e0b;
--color-warning-600: #d97706;

/* 红色 - 错误/危险色 */
--color-error-500: #ef4444;
--color-error-600: #dc2626;
```

#### 中性色 (Neutral)
```css
/* 浅色主题 */
--color-gray-50: #f9fafb;
--color-gray-100: #f3f4f6;
--color-gray-200: #e5e7eb;
--color-gray-300: #d1d5db;
--color-gray-400: #9ca3af;
--color-gray-500: #6b7280;
--color-gray-600: #4b5563;
--color-gray-700: #374151;
--color-gray-800: #1f2937;
--color-gray-900: #111827;

/* 深色主题 */
--color-dark-50: #f9fafb;
--color-dark-100: #f3f4f6;
--color-dark-200: #e5e7eb;
--color-dark-300: #d1d5db;
--color-dark-400: #9ca3af;
--color-dark-500: #6b7280;
--color-dark-600: #4b5563;
--color-dark-700: #374151;
--color-dark-800: #1f2937;
--color-dark-900: #111827;
```

#### 语义色 (Semantic)
```css
/* 文本颜色 */
--color-text-primary: var(--color-gray-900);      /* 主要文字 */
--color-text-secondary: var(--color-gray-600);    /* 次要文字 */
--color-text-muted: var(--color-gray-500);        /* 弱化文字 */

/* 背景颜色 */
--color-bg-primary: #ffffff;                      /* 主要背景 */
--color-bg-secondary: var(--color-gray-50);       /* 次要背景 */
--color-bg-muted: var(--color-gray-100);          /* 弱化背景 */

/* 边框颜色 */
--color-border-light: var(--color-gray-200);      /* 浅色边框 */
--color-border-default: var(--color-gray-300);    /* 默认边框 */
--color-border-dark: var(--color-gray-400);       /* 深色边框 */
```

### 2. 字体系统

#### 字体族 (Font Families)
```css
/* 主要字体 - 无衬线 */
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;

/* 代码字体 - 等宽 */
--font-mono: 'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace;

/* 备用字体栈 */
font-family: var(--font-sans);
```

#### 字体大小 (Font Sizes)
```css
/* 基础字体大小 */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
--text-6xl: 3.75rem;   /* 60px */
```

#### 行高 (Line Heights)
```css
/* 行高设置 */
--leading-none: 1;
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;    /* 默认行高 */
--leading-relaxed: 1.625;
--leading-loose: 2;
```

#### 字重 (Font Weights)
```css
/* 字重设置 */
--font-thin: 100;
--font-extralight: 200;
--font-light: 300;
--font-normal: 400;      /* 正常 */
--font-medium: 500;      /* 中等 */
--font-semibold: 600;    /* 半粗 */
--font-bold: 700;        /* 粗体 */
--font-extrabold: 800;
--font-black: 900;
```

### 3. 间距系统 (Spacing)

#### 基础间距单位
```css
/* 基于4px的间距系统 */
--space-0: 0;
--space-px: 1px;
--space-0_5: 0.125rem;   /* 2px */
--space-1: 0.25rem;      /* 4px */
--space-1_5: 0.375rem;   /* 6px */
--space-2: 0.5rem;       /* 8px */
--space-2_5: 0.625rem;   /* 10px */
--space-3: 0.75rem;      /* 12px */
--space-3_5: 0.875rem;   /* 14px */
--space-4: 1rem;         /* 16px */
--space-5: 1.25rem;      /* 20px */
--space-6: 1.5rem;       /* 24px */
--space-7: 1.75rem;      /* 28px */
--space-8: 2rem;         /* 32px */
--space-9: 2.25rem;      /* 36px */
--space-10: 2.5rem;      /* 40px */
--space-11: 2.75rem;     /* 44px */
--space-12: 3rem;        /* 48px */
--space-14: 3.5rem;      /* 56px */
--space-16: 4rem;        /* 64px */
--space-20: 5rem;        /* 80px */
--space-24: 6rem;        /* 96px */
--space-28: 7rem;        /* 112px */
--space-32: 8rem;        /* 128px */
--space-36: 9rem;        /* 144px */
--space-40: 10rem;       /* 160px */
--space-44: 11rem;       /* 176px */
--space-48: 12rem;       /* 192px */
--space-52: 13rem;       /* 208px */
--space-56: 14rem;       /* 224px */
--space-60: 15rem;       /* 240px */
--space-64: 16rem;       /* 256px */
--space-72: 18rem;       /* 288px */
--space-80: 20rem;       /* 320px */
--space-96: 24rem;       /* 384px */
```

### 4. 圆角系统 (Border Radius)
```css
/* 圆角设置 */
--radius-none: 0;
--radius-sm: 0.125rem;   /* 2px */
--radius-default: 0.25rem; /* 4px */
--radius-md: 0.375rem;   /* 6px */
--radius-lg: 0.5rem;     /* 8px */
--radius-xl: 0.75rem;    /* 12px */
--radius-2xl: 1rem;      /* 16px */
--radius-3xl: 1.5rem;    /* 24px */
--radius-full: 9999px;   /* 完全圆形 */
```

### 5. 阴影系统 (Shadows)
```css
/* 阴影设置 */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-default: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
--shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
```

## 🖼️ 视觉设计

### 1. 布局设计

#### 网格系统 (Grid System)
```css
/* 响应式断点 */
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;

/* 容器宽度 */
--container-sm: 100%;
--container-md: 100%;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;

/* 内容宽度 */
--content-width: 65ch;  /* 最佳可读宽度 */
```

#### 页面布局
```css
/* 基础布局结构 */
.layout-container {
  max-width: var(--container-xl);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--space-4);
  padding-right: var(--space-4);
}

/* 内容区域 */
.content-area {
  max-width: var(--content-width);
  margin-left: auto;
  margin-right: auto;
}

/* 侧边栏布局 */
.sidebar-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);
}

@media (min-width: 1024px) {
  .sidebar-layout {
    grid-template-columns: 1fr 300px;
  }
}
```

### 2. 组件设计

#### 按钮 (Buttons)
```css
/* 基础按钮样式 */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-default);
  font-weight: var(--font-medium);
  transition-property: color, background-color, border-color;
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* 按钮变体 */
.btn-primary {
  background-color: var(--color-primary-600);
  color: white;
}

.btn-primary:hover {
  background-color: var(--color-primary-700);
}

.btn-secondary {
  background-color: var(--color-gray-100);
  color: var(--color-gray-900);
}

.btn-secondary:hover {
  background-color: var(--color-gray-200);
}
```

#### 卡片 (Cards)
```css
/* 卡片基础样式 */
.card {
  background-color: white;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border-light);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.card:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--color-border-default);
}

/* 深色主题卡片 */
.dark .card {
  background-color: var(--color-dark-800);
  border-color: var(--color-dark-700);
}
```

#### 导航 (Navigation)
```css
/* 导航栏样式 */
.navbar {
  background-color: white;
  border-bottom: 1px solid var(--color-border-light);
  backdrop-filter: blur(8px);
}

.dark .navbar {
  background-color: rgba(17, 24, 39, 0.8);
  border-bottom-color: var(--color-dark-700);
}

/* 导航链接 */
.nav-link {
  color: var(--color-gray-600);
  font-weight: var(--font-medium);
}

.nav-link:hover {
  color: var(--color-primary-600);
}

.nav-link.active {
  color: var(--color-primary-600);
  border-bottom: 2px solid var(--color-primary-600);
}
```

### 3. 排版设计

#### 文章排版
```css
/* 文章内容区域 */
.article-content {
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
  color: var(--color-text-primary);
}

/* 标题样式 */
.article-content h1 {
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  margin-top: var(--space-8);
  margin-bottom: var(--space-4);
}

.article-content h2 {
  font-size: var(--text-3xl);
  font-weight: var(--font-semibold);
  margin-top: var(--space-6);
  margin-bottom: var(--space-3);
}

.article-content h3 {
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  margin-top: var(--space-5);
  margin-bottom: var(--space-2);
}

/* 段落样式 */
.article-content p {
  margin-top: var(--space-4);
  margin-bottom: var(--space-4);
}

/* 列表样式 */
.article-content ul,
.article-content ol {
  margin-top: var(--space-4);
  margin-bottom: var(--space-4);
  padding-left: var(--space-6);
}

.article-content li {
  margin-top: var(--space-2);
  margin-bottom: var(--space-2);
}

/* 引用样式 */
.article-content blockquote {
  border-left: 4px solid var(--color-primary-500);
  padding-left: var(--space-4);
  margin-left: 0;
  margin-right: 0;
  font-style: italic;
  color: var(--color-text-secondary);
}
```

#### 代码块样式
```css
/* 行内代码 */
.article-content code {
  font-family: var(--font-mono);
  font-size: 0.9em;
  background-color: var(--color-gray-100);
  padding: 0.2em 0.4em;
  border-radius: var(--radius-sm);
}

.dark .article-content code {
  background-color: var(--color-dark-700);
}

/* 代码块 */
.article-content pre {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  background-color: var(--color-gray-900);
  color: var(--color-gray-100);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  overflow-x: auto;
  margin-top: var(--space-4);
  margin-bottom: var(--space-4);
}

.dark .article-content pre {
  background-color: var(--color-dark-900);
  color: var(--color-dark-100);
}

/* 代码高亮主题 */
:root {
  --code-keyword: #ff7b72;
  --code-string: #a5d6ff;
  --code-number: #79c0ff;
  --code-comment: #8b949e;
  --code-function: #d2a8ff;
  --code-operator: #ff7b72;
}
```

## 🌓 主题系统

### 1. 浅色主题 (Light Theme)
```css
:root {
  /* 背景色 */
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f9fafb;
  --color-bg-tertiary: #f3f4f6;
  
  /* 文字色 */
  --color-text-primary: #111827;
  --color-text-secondary: #4b5563;
  --color-text-tertiary: #6b7280;
  
  /* 边框色 */
  --color-border-light: #e5e7eb;
  --color-border-default: #d1d5db;
  --color-border-dark: #9ca3af;
  
  /* 阴影 */
  --shadow-default: 0 1px 3px 0 rgb(0 0 0 / 0.1);
}
```

### 2. 深色主题 (Dark Theme)
```css
.dark {
  /* 背景色 */
  --color-bg-primary: #111827;
  --color-bg-secondary: #1f2937;
  --color-bg-tertiary: #374151;
  
  /* 文字色 */
  --color-text-primary: #f9fafb;
  --color-text-secondary: #d1d5db;
  --color-text-tertiary: #9ca3af;
  
  /* 边框色 */
  --color-border-light: #374151;
  --color-border-default: #4b5563;
  --color-border-dark: #6b7280;
  
  /* 阴影 */
  --shadow-default: 0 1px 3px 0 rgb(0 0 0 / 0.3);
}
```

### 3. 主题切换实现
```typescript
// 主题切换组件示例
import { useEffect, useState } from 'react';

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
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label={`切换到${theme === 'light' ? '深色' : '浅色'}主题`}
    >
      {theme === 'light' ? (
        <MoonIcon className="w-5 h-5" />
      ) : (
        <SunIcon className="w-5 h-5" />
      )}
    </button>
  );
}
```

## 📱 响应式设计

### 1. 断点策略
```css
/* Tailwind CSS断点对应 */
/* sm: 640px */   /* 小屏幕手机 */
/* md: 768px */   /* 平板 */
/* lg: 1024px */  /* 笔记本 */
/* xl: 1280px */  /* 桌面 */
/* 2xl: 1536px */ /* 大桌面 */
```

### 2. 移动端优化
```css
/* 触摸友好尺寸 */
.touch-target {
  min-height: 44px;
  min-width: 44px;
}

/* 移动端导航 */
.mobile-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid var(--color-border-light);
  padding: var(--space-2);
}

.dark .mobile-nav {
  background: var(--color-dark-800);
  border-top-color: var(--color-dark-700);
}

/* 移动端阅读优化 */
.mobile-reading {
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  padding-left: var(--space-4);
  padding-right: var(--space-4);
}
```

### 3. 响应式组件
```css
/* 响应式网格 */
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: var(--space-4);
}

@media (min-width: 768px) {
  .responsive-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .responsive-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* 响应式图片 */
.responsive-image {
  width: 100%;
  height: auto;
  max-width: 100%;
}

/* 响应式表格 */
.responsive-table {
  display: block;
  overflow-x: auto;
  white-space: nowrap;
}
```

## ♿ 可访问性设计

### 1. 颜色对比度
```css
/* 确保足够的颜色对比度 */
/* 文本与背景对比度至少 4.5:1 */
/* 大文本与背景对比度至少 3:1 */

.accessible-text {
  color: var(--color-text-primary);  /* 对比度检查通过 */
}

.accessible-link {
  color: var(--color-primary-600);
  text-decoration: underline;
}

.accessible-link:hover {
  color: var(--color-primary-700);
  text-decoration: none;
}
```

### 2. 键盘导航
```css
/* 焦点状态 */
.focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

/* 跳过导航链接 */
.skip-to-content {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-primary-600);
  color: white;
  padding: var(--space-2) var(--space-4);
  z-index: 9999;
}

.skip-to-content:focus {
  top: 0;
}
```

### 3. 屏幕阅读器优化
```css
/* 隐藏视觉元素但保留给屏幕阅读器 */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* 图片替代文本 */
.image-with-alt {
  position: relative;
}

.image-with-alt::after {
  content: attr(alt);
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

## 🎨 品牌元素

### 1. Logo设计
```css
/* Logo样式 */
.logo {
  font-family: var(--font-sans);
  font-weight: var(--font-bold);
  font-size: var(--text-2xl);
  color: var(--color-primary-600);
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.logo-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500));
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: var(--font-bold);
}

.dark .logo {
  color: var(--color-primary-400);
}
```

### 2. 图标系统
```css
/* 图标尺寸 */
.icon-xs { width: 12px; height: 12px; }
.icon-sm { width: 16px; height: 16px; }
.icon-md { width: 20px; height: 20px; }
.icon-lg { width: 24px; height: 24px; }
.icon-xl { width: 32px; height: 32px; }

/* 图标颜色 */
.icon-primary { color: var(--color-primary-600); }
.icon-secondary { color: var(--color-gray-600); }
.icon-success { color: var(--color-success-600); }
.icon-warning { color: var(--color-warning-600); }
.icon-error { color: var(--color-error-600); }
```

### 3. 动画效果
```css
/* 过渡动画 */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.transition-colors {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* 微交互动画 */
.hover-lift {
  transition: transform 150ms ease;
}

.hover-lift:hover {
  transform: translateY(-2px);
}

/* 页面过渡 */
.page-transition {
  animation: fadeIn 200ms ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## 📐 设计规范

### 1. 间距规范
```yaml
组件间距:
  内部间距: 使用space-4(16px)作为基础
  外部间距: 使用space-6(24px)作为基础
  密集布局: 使用space-3(12px)
  宽松布局: 使用space-8(32px)

文本间距:
  段落间距: space-4(16px)
  标题间距: space-6(24px) above, space-4(16px) below
  行内元素: space-2(8px)
```

### 2. 排版规范
```yaml
标题层级:
  h1: text-4xl, font-bold, mt-8, mb-4
  h2: text-3xl, font-semibold, mt-6, mb-3
  h3: text-2xl, font-semibold, mt-5, mb-2
  h4: text-xl, font-semibold, mt-4, mb-2

正文排版:
  字体大小: text-lg(18px) for desktop, text-base(16px) for mobile
  行高: leading-relaxed(1.625)
  最大宽度: 65ch
```

### 3. 组件规范
```yaml
按钮规范:
  最小尺寸: 44px × 44px (触摸友好)
  内边距: px-4 py-2
  圆角: rounded-default(4px)
  状态: hover, focus, active, disabled

卡片规范:
  背景: white / dark:gray-800
  边框: 1px solid gray-200 / dark:gray-700
  圆角: rounded-lg(8px)
  阴影: shadow-sm, hover:shadow-md
```

## 🚀 实施指南

### 1. Tailwind CSS配置
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          // ... 其他颜色
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
```

### 2. 全局样式
```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* 定义CSS变量 */
  }
  
  .dark {
    /* 深色主题变量 */
  }
}

@layer components {
  /* 自定义组件样式 */
}

@layer utilities {
  /* 自定义工具类 */
}
```

### 3. 设计令牌 (Design Tokens)
```typescript
// design-tokens.ts
export const designTokens = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      // ... 其他颜色
    },
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['Fira Code', 'monospace'],
    },
  },
  spacing: {
    // 间距定义
  },
};
```

---

## 📝 设计总结

### 设计原则总结
1. **一致性**: 所有组件遵循统一的设计系统
2. **可读性**: 优化排版和对比度，提升阅读体验
3. **响应式**: 移动端优先，全设备适配
4. **可访问性**: 遵循WCAG标准，包容性设计
5. **性能**: 优化加载和交互性能

### 实施优先级
1. **P0**: 基础设计系统建立 (色彩、字体、间距)
2. **P1**: 核心组件开发 (按钮、卡片、导航)
3. **P2**: 主题系统实现 (深色/浅色主题切换)
4. **P3**: 响应式优化和可访问性完善

### 质量保证
1. **设计评审**: 定期进行设计一致性检查
2. **用户测试**: 收集用户反馈，持续优化
3. **性能监控**: 监控加载速度和用户体验指标
4. **代码审查**: 确保实现符合设计规范

---

**设计完成时间**: 2025-02-10  
**下一步行动**: 内容迁移策略制定和第二阶段准备