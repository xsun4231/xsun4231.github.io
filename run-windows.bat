@echo off
echo ========================================
echo Next.js开发服务器启动脚本（Windows）
echo ========================================
echo.

echo 检查Node.js版本...
node --version
if errorlevel 1 (
    echo 错误：未找到Node.js
    echo 请安装Node.js 20.9.0或更高版本
    pause
    exit /b 1
)

echo.
echo 检查npm版本...
npm --version
if errorlevel 1 (
    echo 错误：未找到npm
    pause
    exit /b 1
)

echo.
echo 当前目录：%CD%
echo.

echo 检查项目结构...
if not exist "app" (
    echo 错误：未找到app目录
    echo 请确保在项目根目录运行此脚本
    pause
    exit /b 1
)

if not exist "package.json" (
    echo 错误：未找到package.json
    pause
    exit /b 1
)

echo.
echo 项目结构完整！
echo.

echo 安装依赖（如果需要）...
call npm install

echo.
echo 启动Next.js开发服务器...
echo 按Ctrl+C停止服务器
echo.

call npm run dev

if errorlevel 1 (
    echo.
    echo ========================================
    echo 启动失败！可能的问题：
    echo 1. WSL路径问题 - 项目在WSL文件系统中
    echo 2. 依赖问题 - 尝试删除node_modules并重新安装
    echo 3. 权限问题 - 确保有读写权限
    echo.
    echo 解决方案：
    echo 1. 将项目复制到Windows文件系统
    echo 2. 或在WSL中运行开发服务器
    echo ========================================
    pause
)