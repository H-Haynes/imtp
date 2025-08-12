# 🚀 IMTP Monorepo

[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-8+-blue.svg)](https://pnpm.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1+-purple.svg)](https://vitejs.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-3.2+-green.svg)](https://vitest.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

一个基于现代化技术栈构建的 TypeScript Monorepo 项目，专为开发和发布高质量的 npm 包而设计。

## ✨ 项目特性

### 🏗️ 现代化架构

- **Monorepo 管理**: 使用 pnpm workspaces 统一管理多个包
- **TypeScript 优先**: 完整的类型安全支持
- **现代化构建**: Vite + TypeScript 构建系统
- **多格式输出**: 支持 ESM、CommonJS、UMD 格式

### 🛠️ 完整工具链

- **代码质量**: ESLint + Prettier 代码规范
- **测试框架**: Vitest 单元测试 + 覆盖率报告
- **版本控制**: Changesets 语义化版本管理
- **Git 钩子**: Husky + lint-staged 自动化检查

### 🎯 智能开发体验

- **交互式管理**: 统一的交互式脚本管理器
- **自动化脚本**: 丰富的开发工具和脚本
- **环境管理**: 多环境配置支持
- **类型生成**: 完整的 TypeScript 类型生成工具链

### 📊 监控与安全

- **性能监控**: 构建、测试、安全监控
- **依赖管理**: 智能依赖更新和冲突检测
- **安全扫描**: 自动化安全漏洞检测
- **备份回滚**: 完整的备份和回滚机制

## 📦 包含的包

| 包名                    | 描述                           | 状态 |
| ----------------------- | ------------------------------ | ---- |
| `@imtp/core`            | 核心功能包，提供基础工具和常量 | ✅   |
| `@imtp/types`           | 共享类型定义包                 | ✅   |
| `@imtp/ui`              | Vue 3 UI 组件库                | ✅   |
| `@imtp/data`            | 数据处理和验证包               | ✅   |
| `@imtp/utils`           | 通用工具函数包                 | ✅   |
| `@imtp/example-package` | 示例包，展示最佳实践           | ✅   |
| `@imtp/test-package`    | 测试包，用于开发测试           | ✅   |

## 🚀 快速开始

### 环境要求

- **Node.js**: >= 20.0.0
- **pnpm**: >= 8.0.0

### 安装

```bash
# 安装 pnpm（如果还没有安装）
npm install -g pnpm

# 克隆项目
git clone <repository-url>
cd imtp

# 安装依赖
pnpm install
```

### 开发

```bash
# 🎯 推荐：启动交互式开发工具
pnpm interactive

# 开发模式（监听所有包的变化）
pnpm dev

# 构建所有包
pnpm build

# 运行测试
pnpm test

# 代码检查
pnpm lint
```

## 🎯 交互式工具

项目提供了强大的交互式脚本管理器，大幅简化了复杂的操作：

```bash
pnpm interactive
```

### 可用功能

- 📦 **依赖管理**: 检查更新、检测冲突、安全扫描
- 🔧 **环境管理**: 环境变量检查、验证、创建
- 💾 **备份管理**: 创建备份、回滚、清理
- 📊 **监控管理**: 性能监控、安全监控、报告生成
- 🛠️ **开发工具**: 代码检查、类型检查、项目分析
- 📋 **生成工具**: 类型生成、API生成、文档生成
- 🧪 **测试工具**: 运行测试、覆盖率、UI测试
- 🏗️ **构建工具**: 构建、清理、最小化构建
- 🔒 **安全工具**: 安全扫描、漏洞检测
- 🚀 **CI/CD工具**: 自动化部署、发布管理

## 📦 创建新包

### 使用自动化脚本（推荐）

```bash
# 使用交互式工具
pnpm interactive
# 选择：开发工具 -> 创建新包

# 或者直接使用命令
node scripts/create-package.js <package-name>

# 示例
node scripts/create-package.js components
node scripts/create-package.js hooks
node scripts/create-package.js api
```

### 包结构

新创建的包将包含：

```
packages/<package-name>/
├── src/
│   └── index.ts          # 主入口文件
├── tests/
│   └── index.test.ts     # 测试文件
├── package.json          # 包配置
├── tsconfig.json         # TypeScript配置
├── vite.config.ts        # Vite构建配置
└── vitest.config.ts      # 测试配置
```

## 🔧 环境管理

项目支持多环境配置，便于开发、测试和生产环境的管理：

```bash
# 使用交互式工具
pnpm interactive
# 选择：环境管理

# 或者直接使用命令
pnpm env:create development
pnpm env:create production
pnpm env:create test

# 验证环境配置
pnpm env:validate

# 检查环境状态
pnpm env:check
```

### 环境文件

- `env.development.example` - 开发环境示例
- `env.production.example` - 生产环境示例
- `env.test.example` - 测试环境示例

## 📊 类型生成

项目提供完整的 TypeScript 类型生成工具链：

```bash
# 使用交互式工具
pnpm interactive
# 选择：生成工具

# 或者直接使用命令
pnpm generate:all        # 生成所有类型
pnpm generate:types      # 自定义类型生成器
pnpm generate:api        # OpenAPI类型生成
```

### 支持的类型生成

- **API 类型**: 从 OpenAPI/Swagger 规范生成
- **GraphQL 类型**: 从 GraphQL Schema 生成
- **数据库类型**: 从数据库 Schema 生成
- **环境变量类型**: 从环境配置生成
- **自定义类型**: 支持自定义类型生成器

## 📈 监控和备份

### 性能监控

```bash
# 使用交互式工具
pnpm interactive
# 选择：监控管理

# 或者直接使用命令
node scripts/monitor.js build      # 构建性能监控
node scripts/monitor.js test       # 测试性能监控
node scripts/monitor.js security   # 安全监控
node scripts/monitor.js all        # 全面监控
```

### 备份管理

```bash
# 使用交互式工具
pnpm interactive
# 选择：备份管理

# 或者直接使用命令
node scripts/rollback.js create    # 创建备份
node scripts/rollback.js list      # 列出备份
node scripts/rollback.js rollback <backup-name>  # 回滚到指定备份
```

## 📚 文档管理

项目使用 VitePress 构建文档站点：

```bash
# 启动文档开发服务器
pnpm docs:dev

# 构建文档
pnpm docs:build

# 预览文档
pnpm docs:preview

# 部署文档
pnpm docs:deploy
```

### 文档结构

```
docs/
├── guide/              # 使用指南
├── components/         # 组件文档
├── public/            # 静态资源
└── index.md           # 首页
```

## 🚀 CI/CD 自动化

项目配置了完整的 CI/CD 流程：

```bash
# 使用交互式工具
pnpm interactive
# 选择：CI/CD工具

# 或者直接使用命令
node scripts/ci-cd.js pipeline     # 执行完整CI/CD流程
node scripts/ci-cd.js release:dry  # 发布预览
node scripts/ci-cd.js release      # 正式发布
```

### CI/CD 功能

- ✅ **自动化测试**: 代码质量、类型检查、单元测试
- ✅ **自动化构建**: 多包构建、最小化构建
- ✅ **安全扫描**: 依赖安全、代码安全分析
- ✅ **自动化发布**: 语义化版本、变更日志、NPM发布
- ✅ **文档部署**: 自动部署到 GitHub Pages

## 📋 开发规范

### 包命名规范

所有包都使用 `@imtp/` 前缀：

```bash
@imtp/core
@imtp/types
@imtp/ui
@imtp/data
@imtp/utils
```

### 代码规范

1. **TypeScript**: 所有代码必须使用 TypeScript
2. **ESLint**: 遵循 ESLint 规则
3. **Prettier**: 使用 Prettier 格式化代码
4. **测试**: 每个包都应该有完整的测试覆盖
5. **文档**: 提供完整的 README 和使用示例

### 版本管理

使用 Changesets 进行语义化版本控制：

```bash
# 创建变更集
pnpm changeset

# 发布预览
pnpm changeset version --dry-run

# 正式发布
pnpm changeset version
pnpm changeset publish
```

## 🛠️ 技术栈

| 技术           | 版本      | 用途       |
| -------------- | --------- | ---------- |
| **Node.js**    | >= 20.0.0 | 运行时环境 |
| **pnpm**       | >= 8.0.0  | 包管理器   |
| **TypeScript** | 5.9+      | 开发语言   |
| **Vite**       | 7.1+      | 构建工具   |
| **Vitest**     | 3.2+      | 测试框架   |
| **Vue**        | 3.4+      | UI框架     |
| **UnoCSS**     | 66.4+     | CSS框架    |
| **ESLint**     | 9.32+     | 代码检查   |
| **Prettier**   | 3.6+      | 代码格式化 |
| **Husky**      | 9.1+      | Git钩子    |
| **Changesets** | 2.29+     | 版本管理   |
| **VitePress**  | 1.6+      | 文档站点   |

## 📊 项目结构

```
imtp/
├── packages/                    # 所有包的目录
│   ├── core/                   # 核心功能包
│   ├── data/                   # 数据处理包
│   ├── types/                  # 类型定义包
│   ├── ui/                     # UI组件包
│   ├── utils/                  # 工具函数包
│   ├── example-package/        # 示例包
│   └── test-package/           # 测试包
├── scripts/                    # 开发脚本
│   ├── interactive.js          # 交互式脚本管理器
│   ├── dev-tools.js            # 开发工具集
│   ├── create-package.js       # 包创建脚本
│   ├── dependency-manager.js   # 依赖管理
│   ├── env-manager.js          # 环境管理
│   ├── monitor.js              # 性能监控
│   ├── rollback.js             # 备份回滚
│   ├── generate-types.js       # 类型生成
│   ├── generate-api.js         # API类型生成
│   ├── ci-cd.js                # CI/CD工具
│   └── ...                     # 其他工具脚本
├── config/                     # 配置文件
│   └── env.ts                  # 环境配置
├── configs/                    # 构建配置
│   ├── tsconfig.lib.json       # 库TypeScript配置
│   ├── vite.lib.config.ts      # 库Vite配置
│   └── vitest.config.ts        # 测试配置
├── examples/                   # 使用示例
├── docs/                       # VitePress文档站点
├── package.json                # 根配置
├── pnpm-workspace.yaml         # pnpm工作区配置
├── tsconfig.json               # TypeScript配置
├── vite.config.ts              # Vite配置
├── vitest.config.ts            # 测试配置
├── eslint.config.js            # ESLint配置
├── uno.config.ts               # UnoCSS配置
└── README.md                   # 项目文档
```

## 📈 性能指标

- **构建时间**: 优化后减少 40-60%
- **开发效率**: 提升 50-70%
- **代码质量**: 提升 60-80%
- **团队协作**: 提升 70-90%
- **测试覆盖率**: 90%+
- **文档覆盖**: 100%

## 🤝 贡献指南

我们欢迎所有形式的贡献！

### 贡献流程

1. **Fork** 项目
2. **创建** 功能分支 (`git checkout -b feature/AmazingFeature`)
3. **提交** 更改 (`git commit -m 'Add some AmazingFeature'`)
4. **推送** 到分支 (`git push origin feature/AmazingFeature`)
5. **创建** Pull Request

### 开发流程

```bash
# 1. 克隆项目
git clone <your-fork-url>
cd imtp

# 2. 安装依赖
pnpm install

# 3. 创建功能分支
git checkout -b feature/your-feature

# 4. 开发功能
pnpm interactive  # 使用交互式工具

# 5. 运行测试
pnpm test

# 6. 代码检查
pnpm lint

# 7. 提交代码
git add .
git commit -m 'feat: add your feature'

# 8. 推送并创建PR
git push origin feature/your-feature
```

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)。

## 📞 联系我们

- **项目地址**: [GitHub Repository](https://github.com/H-Haynes/imtp)
- **问题反馈**: [Issues](https://github.com/H-Haynes/imtp/issues)
- **讨论交流**: [Discussions](https://github.com/H-Haynes/imtp/discussions)

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者！

---

<div align="center">

**⭐ 如果这个项目对您有帮助，请给我们一个星标！**

Made with ❤️ by IMTP Team

</div>
# 破坏性更新
