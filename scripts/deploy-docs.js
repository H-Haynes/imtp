#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync, rmSync } from 'fs';
import { join } from 'path';

const DOCS_DIR = 'docs';
const DIST_DIR = join(DOCS_DIR, '.vitepress', 'dist');

console.log('🚀 开始部署文档...');

try {
  // 清理旧的构建文件
  if (existsSync(DIST_DIR)) {
    console.log('🧹 清理旧的构建文件...');
    rmSync(DIST_DIR, { recursive: true, force: true });
  }

  // 安装依赖
  console.log('📦 安装依赖...');
  execSync('pnpm install', { stdio: 'inherit' });

  // 构建文档
  console.log('🔨 构建文档...');
  execSync('pnpm docs:build', { stdio: 'inherit' });

  // 检查构建结果
  if (!existsSync(DIST_DIR)) {
    throw new Error('构建失败：未找到 dist 目录');
  }

  console.log('✅ 文档构建成功！');
  console.log(`📁 构建输出目录: ${DIST_DIR}`);

  // 显示部署选项
  console.log('\n📋 部署选项:');
  console.log('1. GitHub Pages: 将 dist 目录推送到 gh-pages 分支');
  console.log('2. Netlify: 连接 GitHub 仓库，设置构建命令为 pnpm docs:build');
  console.log('3. Vercel: 导入仓库，设置构建命令为 pnpm docs:build');
  console.log('4. 手动部署: 将 dist 目录内容上传到你的服务器');
} catch (error) {
  console.error('❌ 部署失败:', error.message);
  process.exit(1);
}
