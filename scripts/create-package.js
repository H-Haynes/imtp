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

// 创建目录结构
const dirs = [
  packageDir,
  path.join(packageDir, 'src'),
  path.join(packageDir, 'tests'),
];

dirs.forEach(dir => {
  fs.mkdirSync(dir, { recursive: true });
  console.log(`创建目录: ${dir}`);
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
    dev: 'rollup -c -w',
    build: 'rollup -c',
    test: 'jest',
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
  devDependencies: {
    '@rollup/plugin-node-resolve': '^16.0.1',
    '@rollup/plugin-typescript': '^12.1.4',
    rollup: '^4.46.2',
    typescript: '^5.8.3',
  },
};

fs.writeFileSync(
  path.join(packageDir, 'package.json'),
  JSON.stringify(packageJson, null, 2)
);
console.log(`创建文件: ${packageDir}/package.json`);

// 创建tsconfig.json
const tsconfig = {
  extends: '../../tsconfig.json',
  compilerOptions: {
    outDir: './dist',
    rootDir: './src',
    declaration: true,
    declarationMap: true,
    sourceMap: true,
  },
  include: ['src/**/*'],
  exclude: ['node_modules', 'dist', 'tests'],
};

fs.writeFileSync(
  path.join(packageDir, 'tsconfig.json'),
  JSON.stringify(tsconfig, null, 2)
);
console.log(`创建文件: ${packageDir}/tsconfig.json`);

// 创建rollup.config.js
const rollupConfig = `import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { readFileSync } from 'fs';

const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));

export default {
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: './dist',
      outDir: './dist'
    }),
  ],
  external: [...Object.keys(packageJson.peerDependencies || {})],
};`;

fs.writeFileSync(path.join(packageDir, 'rollup.config.js'), rollupConfig);
console.log(`创建文件: ${packageDir}/rollup.config.js`);

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
console.log(`创建文件: ${packageDir}/src/index.ts`);

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
console.log(`创建文件: ${packageDir}/README.md`);

// 创建jest.config.js
const jestConfig = `export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
  ],
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
};`;

fs.writeFileSync(path.join(packageDir, 'jest.config.js'), jestConfig);
console.log(`创建文件: ${packageDir}/jest.config.js`);

console.log('\n✅ 包创建成功！');
console.log(`\n下一步操作:`);
console.log(`1. cd packages/${packageName}`);
console.log(`2. 编辑 src/index.ts 添加你的代码`);
console.log(`3. 在根目录运行 pnpm install 安装依赖`);
console.log(`4. 运行 pnpm dev 开始开发`);
