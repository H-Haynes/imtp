# 指南

欢迎使用 IMTP！这是一个现代化的 TypeScript 项目模板，专为企业级开发而设计。

## 什么是 IMTP？

IMTP（Intelligent Modern TypeScript Project）是一个开箱即用的企业级开发框架，它提供了：

- 🚀 **快速启动** - 基于 Vite 的极速开发体验
- 📦 **Monorepo 架构** - 使用 pnpm workspace 管理多包项目
- 🎨 **组件库支持** - 内置 Vue3 组件库模板
- 📚 **文档站点** - 基于 VitePress 的现代化文档
- 🧪 **测试完备** - 集成 Vitest 测试框架
- 🔧 **开发工具** - 丰富的自动化脚本

## 核心特性

### 1. 现代化技术栈

- **构建工具**: Vite
- **语言**: TypeScript
- **包管理**: pnpm
- **测试**: Vitest
- **代码规范**: ESLint + Prettier
- **文档**: VitePress

### 2. Monorepo 架构

```
imtp/
├── packages/
│   ├── core/          # 核心模块
│   ├── ui/            # UI 组件库
│   ├── utils/         # 工具函数
│   ├── types/         # 类型定义
│   └── data/          # 数据处理
├── docs/              # 文档站点
└── scripts/           # 开发脚本
```

### 3. 完整的开发工具链

- 环境配置管理
- 依赖分析和监控
- 代码生成工具
- 自动化测试
- 文档生成
- 部署发布

## 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/your-repo/imtp.git
cd imtp
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 启动开发服务器

```bash
# 启动所有包的开发服务器
pnpm dev

# 启动特定包
pnpm --filter @imtp/core dev
```

### 4. 运行测试

```bash
# 运行所有测试
pnpm test

# 运行特定包的测试
pnpm --filter @imtp/core test
```

## 项目结构

### 根目录

- `packages/` - 所有包的源码
- `docs/` - VitePress 文档站点
- `scripts/` - 开发工具脚本
- `configs/` - 配置文件
- `examples/` - 使用示例

### 包结构

每个包都遵循相同的结构：

```
package-name/
├── src/           # 源码目录
├── tests/         # 测试文件
├── package.json   # 包配置
├── tsconfig.json  # TypeScript 配置
├── vite.config.ts # Vite 配置
└── vitest.config.ts # 测试配置
```

## 开发流程

### 1. 创建新包

```bash
pnpm run create-package
```

### 2. 开发组件

```bash
# 进入包目录
cd packages/ui

# 启动开发服务器
pnpm dev
```

### 3. 编写测试

```bash
# 运行测试
pnpm test

# 监听模式
pnpm test:watch
```

### 4. 构建发布

```bash
# 构建所有包
pnpm build

# 发布到 npm
pnpm publish
```

## 环境配置

IMTP 支持多环境配置：

- `env.development` - 开发环境
- `env.test` - 测试环境
- `env.production` - 生产环境

使用 `pnpm run env-manager` 来管理环境配置。

## 下一步

- [快速开始](./getting-started.md) - 详细的安装和配置指南
- [项目结构](./project-structure.md) - 深入了解项目架构
- [环境配置](./environment.md) - 环境变量和配置管理
- [开发工具](./dev-tools.md) - 可用的开发脚本和工具
- [测试指南](./testing.md) - 测试策略和最佳实践

## 贡献指南

我们欢迎所有形式的贡献！请查看我们的 [贡献指南](../contributing.md) 了解更多信息。

## 许可证

本项目基于 [MIT 许可证](../LICENSE) 发布。
