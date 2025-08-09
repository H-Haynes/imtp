# 快速开始

本指南将帮助你快速上手 IMTP 项目模板。

## 前置要求

在开始之前，请确保你的系统已安装以下工具：

- **Node.js** (版本 18 或更高)
- **pnpm** (版本 8 或更高)

### 安装 pnpm

如果你还没有安装 pnpm，可以通过以下方式安装：

```bash
# 使用 npm 安装
npm install -g pnpm

# 或使用 curl 安装
curl -fsSL https://get.pnpm.io/install.sh | sh -

# 或使用 Homebrew (macOS)
brew install pnpm
```

## 创建项目

### 1. 克隆项目

```bash
git clone https://github.com/your-repo/imtp.git
cd imtp
```

### 2. 安装依赖

```bash
pnpm install
```

这个命令会安装所有包的依赖，包括：

- 根目录的依赖
- 所有子包的依赖
- 开发工具和脚本

### 3. 环境配置

复制环境配置文件：

```bash
# 复制开发环境配置
cp env.development.example env.development

# 复制测试环境配置
cp env.test.example env.test

# 复制生产环境配置
cp env.production.example env.production
```

根据需要修改这些配置文件中的值。

## 开发模式

### 启动开发服务器

```bash
# 启动所有包的开发服务器
pnpm dev

# 启动特定包的开发服务器
pnpm --filter @imtp/core dev
pnpm --filter @imtp/ui dev
```

### 启动文档站点

```bash
# 进入文档目录
cd docs

# 安装文档依赖
pnpm install

# 启动文档开发服务器
pnpm dev
```

文档站点将在 `http://localhost:5173` 启动。

## 构建项目

### 构建所有包

```bash
pnpm build
```

### 构建特定包

```bash
pnpm --filter @imtp/core build
pnpm --filter @imtp/ui build
```

### 构建文档

```bash
cd docs
pnpm build
```

## 运行测试

### 运行所有测试

```bash
pnpm test
```

### 运行特定包的测试

```bash
pnpm --filter @imtp/core test
pnpm --filter @imtp/ui test
```

### 监听模式

```bash
pnpm test:watch
```

### 生成测试覆盖率报告

```bash
pnpm test:coverage
```

## 代码质量

### 代码检查

```bash
# 运行 ESLint
pnpm lint

# 自动修复 ESLint 问题
pnpm lint:fix
```

### 代码格式化

```bash
# 运行 Prettier
pnpm format

# 检查格式化
pnpm format:check
```

## 开发工具

IMTP 提供了丰富的开发工具脚本：

### 环境管理

```bash
# 管理环境配置
pnpm run env-manager

# 验证环境配置
pnpm run validate-env
```

### 依赖管理

```bash
# 分析依赖关系
pnpm run dependency-manager

# 监控依赖变化
pnpm run monitor
```

### 代码生成

```bash
# 生成 API 类型
pnpm run generate-api

# 生成配置类型
pnpm run generate-types
```

### 包管理

```bash
# 创建新包
pnpm run create-package

# 清理脚本
pnpm run cleanup-scripts
```

## 项目结构概览

```
imtp/
├── packages/              # 所有包的源码
│   ├── core/             # 核心模块
│   ├── ui/               # UI 组件库
│   ├── utils/            # 工具函数
│   ├── types/            # 类型定义
│   └── data/             # 数据处理
├── docs/                 # VitePress 文档站点
├── scripts/              # 开发工具脚本
├── configs/              # 配置文件
├── examples/             # 使用示例
├── package.json          # 根包配置
├── pnpm-workspace.yaml   # pnpm 工作区配置
└── tsconfig.json         # TypeScript 配置
```

## 常用命令

| 命令           | 描述                   |
| -------------- | ---------------------- |
| `pnpm dev`     | 启动所有包的开发服务器 |
| `pnpm build`   | 构建所有包             |
| `pnpm test`    | 运行所有测试           |
| `pnpm lint`    | 代码检查               |
| `pnpm format`  | 代码格式化             |
| `pnpm clean`   | 清理构建文件           |
| `pnpm publish` | 发布所有包             |

## 下一步

现在你已经成功设置了 IMTP 项目！接下来可以：

1. [查看项目结构](./project-structure.md) - 深入了解项目架构
2. [学习组件开发](../components/) - 了解如何开发 Vue3 组件
3. [查看 API 文档](../api/) - 了解各个模块的 API
4. [运行示例](../examples/) - 查看使用示例

如果你遇到任何问题，请查看 [常见问题](../faq.md) 或提交 [Issue](https://github.com/your-repo/imtp/issues)。
