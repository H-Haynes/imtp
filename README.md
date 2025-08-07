# IMTP Monorepo

这是一个使用pnpm和rollup构建的monorepo项目，用于开发和发布多个npm包。

## 项目结构

```
imtp/
├── packages/           # 所有包的目录
│   └── example-package/ # 示例包
├── package.json        # 根package.json
├── pnpm-workspace.yaml # pnpm workspace配置
├── tsconfig.json       # TypeScript配置
├── rollup.config.js    # Rollup配置模板
└── README.md          # 项目文档
```

## 快速开始

### 安装依赖

```bash
# 安装pnpm（如果还没有安装）
npm install -g pnpm

# 安装项目依赖
pnpm install
```

### 开发

```bash
# 开发模式（监听所有包的变化）
pnpm dev

# 构建所有包
pnpm build

# 清理构建文件
pnpm clean
```

### 测试

```bash
# 运行所有包的测试
pnpm test

# 运行lint检查
pnpm lint
```

## 创建新包

### 使用自动化脚本（推荐）

```bash
# 创建新包
pnpm create-package <package-name>

# 示例
pnpm create-package utils
pnpm create-package components
```

### 手动创建

1. 在`packages/`目录下创建新文件夹
2. 复制`example-package`的结构
3. 修改`package.json`中的包名和描述
4. 在根目录运行`pnpm install`安装新包的依赖

## 发布包

### 使用Changesets（推荐）

```bash
# 创建变更集
pnpm changeset

# 更新版本
pnpm version-packages

# 发布
pnpm release
```

### 手动发布

```bash
# 构建所有包
pnpm build

# 进入特定包目录
cd packages/your-package

# 发布
npm publish
```

## 包命名规范

所有包都使用`@imtp/`前缀，例如：

- `@imtp/example-package`
- `@imtp/utils`
- `@imtp/components`

## 技术栈

- **包管理器**: pnpm
- **构建工具**: Rollup
- **语言**: TypeScript
- **版本管理**: Changesets
- **工作区**: pnpm workspaces

## 开发规范

1. 所有包都应该有完整的TypeScript类型定义
2. 使用ESLint进行代码检查
3. 编写单元测试
4. 提供完整的README文档
5. 遵循语义化版本控制

## 许可证

MIT
