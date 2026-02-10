#!/bin/bash

echo "========================================"
echo "Next.js开发服务器启动脚本"
echo "========================================"
echo ""

echo "当前目录: $(pwd)"
echo ""

# 检查app目录
if [ -d "app" ]; then
    echo "✓ app目录存在"
else
    echo "✗ 错误：未找到app目录"
    echo "请确保在项目根目录运行此脚本"
    exit 1
fi

# 检查package.json
if [ -f "package.json" ]; then
    echo "✓ package.json存在"
else
    echo "✗ 错误：未找到package.json"
    exit 1
fi

# 检查Node.js
if command -v nodejs &> /dev/null; then
    NODE_VERSION=$(nodejs --version)
    echo "✓ Node.js版本: $NODE_VERSION"
    
    # 检查Node.js版本是否足够
    if [[ "$NODE_VERSION" =~ ^v1[0-9]\. ]]; then
        echo "⚠ 警告：Node.js版本可能较低，已自动降级Next.js到13.x"
    fi
else
    echo "✗ 错误：WSL中未找到Node.js"
    echo ""
    echo "解决方案："
    echo "1. 安装Node.js: sudo apt install nodejs npm"
    echo "2. 或使用Windows终端运行"
    exit 1
fi

# 检查npm
if command -v npm &> /dev/null; then
    echo "✓ npm可用"
else
    echo "✗ 错误：未找到npm"
    exit 1
fi

echo ""
echo "✅ 所有检查通过！"
echo ""
echo "启动Next.js开发服务器..."
echo "本地地址: http://localhost:3000"
echo "按Ctrl+C停止服务器"
echo "========================================"
echo ""

# 运行开发服务器
npx next dev