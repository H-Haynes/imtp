# IMTP Monorepo

这是一个使用pnpm和Vite构建的现代化monorepo项目，用于开发和发布多个npm包。

## 🚀 项目特性

- **现代化构建**: 使用Vite + TypeScript构建
- **完整工具链**: ESLint、Prettier、Vitest、Husky
- **类型安全**: 完整的TypeScript类型定义
- **自动化脚本**: 丰富的开发工具和脚本
- **环境管理**: 多环境配置支持
- **交互式管理**: 统一的交互式脚本管理器

## 📁 项目结构

```
imtp/
├── packages/           # 所有包的目录
│   ├── core/          # 核心功能包
│   ├── data/          # 数据处理包
│   ├── types/         # 类型定义包
│   ├── ui/            # UI组件包
│   ├── utils/         # 工具函数包
│   ├── example-package/ # 示例包
│   └── test-package/  # 测试包
├── scripts/           # 开发脚本
├── config/            # 配置文件
├── configs/           # 构建配置
├── examples/          # 使用示例
├── package.json       # 根package.json
├── pnpm-workspace.yaml # pnpm workspace配置
├── tsconfig.json      # TypeScript配置
├── vite.config.ts     # Vite配置
├── vitest.config.ts   # 测试配置
└── README.md          # 项目文档
```

## 🚀 快速开始

### 安装依赖

```bash
# 安装pnpm（如果还没有安装）
npm install -g pnpm

# 安装项目依赖
pnpm install
```

### 开发

```bash
# 交互式开发工具（推荐）
pnpm interactive

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

# 类型检查
pnpm type-check
```

## 🎯 交互式工具

项目提供了统一的交互式脚本管理器，简化了复杂的命令操作：

```bash
# 启动交互式工具
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

## 📦 创建新包

### 使用自动化脚本（推荐）

```bash
# 创建新包
node scripts/create-package.js <package-name>

# 示例
node scripts/create-package.js utils
node scripts/create-package.js components
```

### 手动创建

1. 在`packages/`目录下创建新文件夹
2. 复制`example-package`的结构
3. 修改`package.json`中的包名和描述
4. 在根目录运行`pnpm install`安装新包的依赖

## 🔧 环境管理

项目支持多环境配置：

```bash
# 创建环境文件
pnpm env:create development
pnpm env:create production
pnpm env:create test

# 验证环境配置
pnpm env:validate

# 检查环境状态
pnpm env:check
```

## 📊 类型生成

项目提供完整的TypeScript类型生成工具链：

```bash
# 生成所有类型
pnpm generate:all

# 分步生成
pnpm generate:types    # 自定义类型生成器
pnpm generate:api      # OpenAPI类型
pnpm generate:graphql  # GraphQL类型
pnpm docs             # 生成文档
```

## 📈 监控和备份

```bash
# 性能监控
node scripts/monitor.js build
node scripts/monitor.js test
node scripts/monitor.js security

# 备份管理
node scripts/rollback.js create
node scripts/rollback.js list
node scripts/rollback.js rollback <backup-name>
```

## 📦 包命名规范

所有包都使用`@imtp/`前缀，例如：

- `@imtp/core`
- `@imtp/data`
- `@imtp/types`
- `@imtp/ui`
- `@imtp/utils`

## 🛠️ 技术栈

- **包管理器**: pnpm
- **构建工具**: Vite
- **语言**: TypeScript
- **测试**: Vitest
- **代码检查**: ESLint
- **格式化**: Prettier
- **版本管理**: Changesets
- **工作区**: pnpm workspaces
- **Git钩子**: Husky

## 📚 开发规范

1. 所有包都应该有完整的TypeScript类型定义
2. 使用ESLint进行代码检查
3. 编写单元测试
4. 提供完整的README文档
5. 遵循语义化版本控制

## 📖 相关文档

- [脚本详细说明文档](./脚本详细说明文档.md)
- [TS类型生成指南](./TS类型生成.md)
- [环境配置文档](./env.md)
- [CI/CD指南](./CI&CD.md)
- [功能建议](./功能建议.md)

## 🤝 贡献

欢迎提交Issue和Pull Request来改进项目！

## 📄 许可证

MIT
