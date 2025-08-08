#!/usr/bin/env node

import { execSync } from 'child_process';

console.log('🔍 开始代码检查...');

try {
  // 运行 lint-staged
  console.log('📝 运行代码格式化和检查...');
  execSync('npx lint-staged', { stdio: 'inherit' });

  console.log('✅ 代码检查完成！');
} catch {
  console.error('❌ 代码检查失败，请修复上述问题后重试');
  process.exit(1);
}
