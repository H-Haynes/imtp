#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 获取命令行参数
const packageName = process.argv[2];

if (!packageName) {
  console.error('请提供包名！');
  console.log('使用方法: node scripts/create-package.js <package-name>');
  process.exit(1);
}

// 验证包名格式
if (!/^[a-z][a-z0-9-]*$/.test(packageName)) {
  console.error('包名只能包含小写字母、数字和连字符，且必须以字母开头！');
  process.exit(1);
}

const packageDir = path.join(__dirname, '..', 'packages', packageName);

// 检查包是否已存在
if (fs.existsSync(packageDir)) {
  console.error(`包 ${packageName} 已存在！`);
  process.exit(1);
}

// 读取根目录的 package.json 来获取依赖版本
const rootPackageJsonPath = path.join(__dirname, '..', 'package.json');
let rootPackageJson;

try {
  rootPackageJson = JSON.parse(fs.readFileSync(rootPackageJsonPath, 'utf8'));
} catch (error) {
  console.error('无法读取根目录的 package.json:', error.message);
  process.exit(1);
}

// 获取根目录的依赖版本
const getDependencyVersion = (depName, deps) => {
  if (deps && deps[depName]) {
    return deps[depName];
  }
  return null;
};

// 定义新包需要的依赖及其在根目录中的位置
const requiredDependencies = {
  typescript: 'devDependencies',
  vite: 'devDependencies',
  vitest: 'devDependencies',
};

// 构建新包的依赖对象
const buildDependencies = () => {
  const devDependencies = {};

  for (const [depName, depType] of Object.entries(requiredDependencies)) {
    const version = getDependencyVersion(depName, rootPackageJson[depType]);
    if (version) {
      devDependencies[depName] = version;
      console.log(`📦 继承依赖: ${depName}@${version}`);
    } else {
      console.warn(`⚠️  警告: 根目录中未找到 ${depName}，将使用默认版本`);
      // 使用默认版本作为后备
      const defaultVersions = {
        typescript: '^5.9.2',
        vite: '^7.1.0',
        vitest: '^3.2.4',
      };
      devDependencies[depName] = defaultVersions[depName];
    }
  }

  return devDependencies;
};

// 创建目录结构
const dirs = [
  packageDir,
  path.join(packageDir, 'src'),
  path.join(packageDir, 'tests'),
];

dirs.forEach(dir => {
  fs.mkdirSync(dir, { recursive: true });
  console.log(`📁 创建目录: ${dir}`);
});

// 创建package.json
const packageJson = {
  name: `@imtp/${packageName}`,
  version: '1.0.0',
  description: `IMTP ${packageName} package`,
  type: 'module',
  main: 'dist/index.js',
  module: 'dist/index.js',
  types: 'dist/index.d.ts',
  files: ['dist'],
  scripts: {
    dev: 'vite build --watch',
    build: 'vite build',
    'build:esm': 'vite build --mode esm',
    'build:cjs': 'vite build --mode cjs',
    'build:umd': 'vite build --mode umd',
    'build:min': 'node ../../scripts/build-min.js',
    test: 'vitest',
    'test:ui': 'vitest --ui',
    'test:coverage': 'vitest --coverage',
    'type-check': 'tsc --noEmit',
    lint: 'eslint src --ext .ts,.tsx',
    'lint:fix': 'eslint src --ext .ts,.tsx --fix',
    clean: 'rimraf dist',
    prepublishOnly: 'npm run build',
  },
  keywords: [packageName, 'utility'],
  author: 'IMTP',
  license: 'MIT',
  publishConfig: {
    access: 'public',
  },
  devDependencies: buildDependencies(),
};

fs.writeFileSync(
  path.join(packageDir, 'package.json'),
  JSON.stringify(packageJson, null, 2)
);
console.log(`📄 创建文件: ${packageDir}/package.json`);

// 创建tsconfig.json
const tsconfig = {
  extends: '../../configs/tsconfig.lib.json',
  compilerOptions: {
    outDir: './dist',
    rootDir: './src',
  },
  include: ['src/**/*'],
  exclude: ['node_modules', 'dist', 'tests'],
};

fs.writeFileSync(
  path.join(packageDir, 'tsconfig.json'),
  JSON.stringify(tsconfig, null, 2)
);
console.log(`📄 创建文件: ${packageDir}/tsconfig.json`);

// 创建src/index.ts
const indexTs = `// ${packageName} 包的主入口文件

export function hello(name: string): string {
  return \`Hello from ${packageName}, \${name}!\`;
}

// 默认导出
export default {
  hello,
};`;

fs.writeFileSync(path.join(packageDir, 'src', 'index.ts'), indexTs);
console.log(`📄 创建文件: ${packageDir}/src/index.ts`);

// 创建README.md
const readme = `# @imtp/${packageName}

这是 ${packageName} 包的说明文档。

## 安装

\`\`\`bash
npm install @imtp/${packageName}
\`\`\`

## 使用方法

\`\`\`typescript
import { hello } from '@imtp/${packageName}';

console.log(hello('World')); // 输出: Hello from ${packageName}, World!
\`\`\`

## API

### \`hello(name: string): string\`

返回一个问候字符串。

## 开发

\`\`\`bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build

# 测试
pnpm test
\`\`\`

## 许可证

MIT`;

fs.writeFileSync(path.join(packageDir, 'README.md'), readme);
console.log(`📄 创建文件: ${packageDir}/README.md`);

// 创建vitest.config.ts
const vitestConfig = `import { createVitestConfig } from '../../configs/vitest.config';

export default createVitestConfig();`;

fs.writeFileSync(path.join(packageDir, 'vitest.config.ts'), vitestConfig);
console.log(`📄 创建文件: ${packageDir}/vitest.config.ts`);

// 创建测试文件
const testFile = `import { describe, it, expect } from 'vitest';
import { hello } from '../src/index';

describe('${packageName}', () => {
  it('should export hello function', () => {
    expect(typeof hello).toBe('function');
  });

  it('should return correct greeting message', () => {
    const result = hello('World');
    expect(result).toBe('Hello from ${packageName}, World!');
  });

  it('should work with different names', () => {
    const result = hello('Test');
    expect(result).toBe('Hello from ${packageName}, Test!');
  });
});`;

fs.writeFileSync(path.join(packageDir, 'tests', 'index.test.ts'), testFile);
console.log(`📄 创建文件: ${packageDir}/tests/index.test.ts`);

// 创建vite.config.ts
const viteConfig = `import { createViteLibConfig } from '../../configs/vite.lib.config';

export default createViteLibConfig({
  entry: 'src/index.ts',
  name: '${packageName}',
  external: [],
  globals: {},
});`;

fs.writeFileSync(path.join(packageDir, 'vite.config.ts'), viteConfig);
console.log(`📄 创建文件: ${packageDir}/vite.config.ts`);

console.log('\n✅ 包创建成功！');
console.log(`\n🎯 优化特性:`);
console.log(`   • 自动继承根目录的依赖版本，避免版本冲突`);
console.log(`   • 使用统一的 TypeScript、Vite、Vitest 版本`);
console.log(`   • 确保 monorepo 依赖一致性`);
console.log(`\n📋 下一步操作:`);
console.log(`1. cd packages/${packageName}`);
console.log(`2. 编辑 src/index.ts 添加你的代码`);
console.log(`3. 在根目录运行 pnpm install 安装依赖`);
console.log(`4. 运行 pnpm dev 开始开发`);
console.log(`\n💡 提示: 新包已使用与根目录相同的依赖版本，不会产生版本冲突！`);
