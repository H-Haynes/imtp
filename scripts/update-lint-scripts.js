#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const packages = [
  'packages/core',
  'packages/data',
  'packages/types',
  'packages/ui',
  'packages/utils',
  'packages/example-package',
  'packages/test-package',
];

function updateLintScript(packagePath) {
  const packageJsonPath = resolve(packagePath, 'package.json');

  try {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

    if (packageJson.scripts && packageJson.scripts.lint) {
      // 检查是否已经包含 --no-warn-ignored
      if (!packageJson.scripts.lint.includes('--no-warn-ignored')) {
        packageJson.scripts.lint += ' --no-warn-ignored';
        writeFileSync(
          packageJsonPath,
          JSON.stringify(packageJson, null, 2) + '\n'
        );
        console.log(`✅ 更新 ${packagePath}/package.json`);
      } else {
        console.log(`⏭️  ${packagePath}/package.json 已包含 --no-warn-ignored`);
      }
    }
  } catch (error) {
    console.error(`❌ 更新 ${packagePath}/package.json 失败:`, error.message);
  }
}

console.log('🔧 更新所有包的 lint 脚本...\n');

packages.forEach(updateLintScript);

console.log('\n✅ 更新完成！');
