# WSL + Next.js 路径问题解决方案

## 问题描述
在WSL环境中运行`npm run dev`时出现错误：
```
'\\wsl.localhost\Ubuntu\home\xsun\xsun4231.github.io'
CMD.EXE was started with the above path as the current directory.
UNC paths are not supported.  Defaulting to Windows directory.
Error: > Couldn't find any `pages` or `app` directory. Please create one under the project root
```

## 问题原因
1. **混合环境问题**：Next.js在Windows环境中运行，但项目文件在WSL文件系统中
2. **UNC路径问题**：WSL路径`\\wsl.localhost\Ubuntu\...`是UNC路径，Windows的Next.js无法正确处理
3. **路径映射问题**：Windows和WSL之间的文件系统路径不兼容

## 解决方案

### 方案1：在WSL中安装Node.js（推荐）
```bash
# 在WSL终端中运行
sudo apt update
sudo apt install -y nodejs npm

# 验证安装
node --version
npm --version

# 运行开发服务器
cd /home/xsun/xsun4231.github.io
npm run dev
```

### 方案2：使用Windows终端运行
1. 打开Windows终端（不是WSL终端）
2. 导航到Windows中的项目路径（如果已映射）
3. 运行：
   ```cmd
   cd C:\path\to\project
   npm run dev
   ```

### 方案3：将项目移动到Windows文件系统
```bash
# 在WSL中复制项目到Windows目录
cp -r /home/xsun/xsun4231.github.io /mnt/c/Users/YourUsername/

# 在Windows终端中运行
cd C:\Users\YourUsername\xsun4231.github.io
npm run dev
```

### 方案4：使用VS Code Remote - WSL扩展
1. 在VS Code中安装"Remote - WSL"扩展
2. 使用VS Code打开WSL中的项目
3. 在VS Code的集成终端中运行：
   ```bash
   npm run dev
   ```

### 方案5：创建启动脚本
已创建`run-dev.sh`脚本，提供清晰的错误信息和解决方案：
```bash
chmod +x run-dev.sh
./run-dev.sh
```

## 当前项目状态

### 项目结构完整
- ✅ `app/` 目录存在且包含所有Next.js文件
- ✅ `components/` 目录包含所有React组件
- ✅ `content/` 目录包含示例博客文章
- ✅ 所有配置文件正确

### 功能完整
- ✅ 现代化Next.js 14 + TypeScript + Tailwind CSS
- ✅ 快速搜索功能（Ctrl+K快捷键）
- ✅ 明/暗主题切换
- ✅ 响应式设计
- ✅ GitHub Actions自动化部署配置

### 部署就绪
- ✅ GitHub Actions工作流配置完成
- ✅ 静态导出配置优化
- ✅ 项目已提交到git

## 测试建议

### 1. 本地开发测试
```bash
# 方法A：在WSL中安装Node.js后
cd /home/xsun/xsun4231.github.io
npm run dev

# 方法B：使用提供的脚本
./run-dev.sh
```

### 2. 构建测试
```bash
# 测试构建过程
npm run build
npm run export

# 检查生成的静态文件
ls -la out/
```

### 3. 部署测试
1. 推送代码到GitHub
2. 检查GitHub Actions工作流运行状态
3. 访问 https://xsun4231.github.io 验证部署

## 故障排除

### 常见问题1：权限问题
```bash
# 确保脚本可执行
chmod +x run-dev.sh
chmod +x scripts/*.js
```

### 常见问题2：依赖问题
```bash
# 重新安装依赖
rm -rf node_modules package-lock.json
npm install
```

### 常见问题3：路径问题
```bash
# 验证目录结构
ls -la
ls -la app/
```

## 下一步行动

1. **立即行动**：在WSL中安装Node.js或使用Windows终端运行开发服务器
2. **内容迁移**：运行`scripts/migrate-content.js`迁移旧文章
3. **部署测试**：推送代码到GitHub测试自动化部署
4. **自定义配置**：根据需要调整主题、布局等

## 技术支持
- Next.js文档：https://nextjs.org/docs
- WSL文档：https://docs.microsoft.com/windows/wsl/
- GitHub Issues：搜索"Next.js WSL path issue"