# IMTP 项目脚本详细说明文档

## 📋 目录

- [概述](#-概述)
- [脚本分类](#-脚本分类)
- [交互式脚本管理器](#-交互式脚本管理器)
- [核心开发脚本](#-核心开发脚本)
- [环境管理脚本](#-环境管理脚本)
- [类型生成脚本](#-类型生成脚本)
- [CI/CD 脚本](#-cicd-脚本)
- [构建和测试脚本](#️-构建和测试脚本)
- [代码质量脚本](#-代码质量脚本)
- [监控和备份脚本](#-监控和备份脚本)
- [工具脚本](#️-工具脚本)
- [使用指南](#-使用指南)
- [故障排除](#-故障排除)
- [脚本优化建议](#-脚本优化建议)
- [总结](#-总结)

## 📖 概述

IMTP 项目包含了一套完整的开发工具链脚本，涵盖了从环境管理、类型生成、构建测试到监控备份的全流程。这些脚本采用模块化设计，支持独立运行和组合使用。

### 🎯 项目特色

- **17个脚本文件** - 覆盖开发全流程
- **47个package.json命令** - 丰富的功能选项
- **交互式管理器** - 统一的用户界面
- **自动化工具链** - 从开发到部署的完整支持
- **类型安全** - 完整的TypeScript支持
- **现代化架构** - 基于Vite和最新技术栈
- **模块化设计** - 每个脚本专注于特定功能
- **容错性强** - 支持优雅的错误处理和降级方案

### 🎯 脚本设计原则

- **模块化**: 每个脚本专注于特定功能
- **容错性**: 支持优雅的错误处理和降级方案
- **可配置**: 通过环境变量和配置文件灵活配置
- **可扩展**: 易于添加新功能和自定义
- **交互式**: 提供统一的交互式管理界面
- **用户友好**: 清晰的帮助信息和错误提示
- **性能优化**: 支持并行处理和缓存机制
- **标准化**: 统一的代码风格和最佳实践
- **自动化**: 减少手动操作，提高效率
- **可维护性**: 清晰的代码结构和文档

## 📂 脚本分类

### 脚本文件列表

项目包含 **17个脚本文件**：

1. `build-min.js` - 最小化构建工具
2. `ci-cd.js` - CI/CD 流程管理器
3. `cleanup-scripts.js` - 脚本清理工具 (暂未实现)
4. `create-package.js` - 包创建工具
5. `dependency-manager.js` - 依赖管理工具
6. `deploy-docs.js` - 文档部署工具
7. `dev-tools.js` - 开发工具集
8. `env-manager.js` - 环境变量管理器
9. `generate-api.js` - API类型生成器
10. `generate-types.js` - TypeScript类型生成器
11. `interactive.js` - 交互式脚本管理器
12. `monitor.js` - 性能监控工具
13. `pre-commit.js` - 预提交检查
14. `rollback.js` - 备份回滚工具
15. `test-env.js` - 环境测试工具
16. `update-lint-scripts.js` - Lint脚本更新器
17. `validate-env.js` - 环境变量验证器

### 按功能分类

| 类别     | 主要功能                         |
| -------- | -------------------------------- |
| 核心开发 | 项目分析、开发工具、包创建       |
| 环境管理 | 环境变量检查、验证、创建         |
| 类型生成 | TypeScript、API、GraphQL类型生成 |
| 构建测试 | 构建、测试、清理、格式化         |
| 代码质量 | Lint、类型检查、预提交           |
| 监控备份 | 性能监控、备份回滚               |
| 工具脚本 | 最小化构建、验证等               |
| 交互式   | 统一的交互式脚本管理器           |
| CI/CD    | 持续集成和部署流程               |

### 按使用频率分类

- **高频使用**: 交互式工具、构建、测试、格式化、环境管理
- **中频使用**: 类型生成、代码质量检查、依赖管理
- **低频使用**: 监控、备份、分析、CI/CD
- **按场景分类**: 开发、测试、构建、部署、维护

## 🎯 交互式脚本管理器

### `interactive.js` - 统一交互式管理器

**功能**: 提供统一的交互式界面，整合所有功能模块，大幅简化package.json脚本

**使用方法**:

```bash
# 启动交互式管理器
pnpm interactive
```

**功能模块**:

```
🚀 IMTP 交互式脚本管理器
==================================================
请选择要执行的功能：

1. 📦 依赖管理 (7个选项)
2. 🔧 环境管理 (5个选项)
3. 💾 备份管理 (4个选项)
4. 📊 监控管理 (5个选项)
5. 🛠️  开发工具 (7个选项)
6. 📋 生成工具 (5个选项)
7. 🧪 测试工具 (4个选项)
8. 🏗️  构建工具 (4个选项)
9. 🔒 安全工具 (2个选项)
10. 🚀 CI/CD 工具 (3个选项)
0. ❌ 退出
```

**交互式特性**:

- 循环操作，执行后自动返回菜单
- 支持命令历史记录
- 提供详细的执行反馈
- 支持中断和恢复操作
- 清晰的菜单导航
- 丰富的emoji图标
- 友好的错误提示

**优化效果**:

- **脚本文件数量**: 17个脚本文件
- **package.json脚本命令**: 47个脚本命令
- **命令记忆**: 只需要记住一个命令 `pnpm interactive`
- **用户体验**: 清晰的菜单和选项，带emoji图标
- **操作效率**: 循环操作，执行后自动返回菜单
- **学习成本**: 大幅降低，新用户快速上手
- **维护成本**: 统一管理，减少重复代码
- **功能覆盖**: 从开发到部署的全流程支持
- **错误处理**: 统一的错误处理和恢复机制
- **扩展性**: 易于添加新功能和自定义

## 🔧 核心开发脚本

### 1. `dev-tools.js` - 开发工具集

**功能**: 提供统一的开发工具入口，集成多种开发功能

**使用方法**:

```bash
# 基本用法
node scripts/dev-tools.js <command> [sub-command]

# 项目分析
node scripts/dev-tools.js analyze

# 代码质量检查
node scripts/dev-tools.js lint

# 类型检查
node scripts/dev-tools.js type-check

# 环境变量管理
node scripts/dev-tools.js env:check
node scripts/dev-tools.js env:validate
node scripts/dev-tools.js env:create
node scripts/dev-tools.js env:local
node scripts/dev-tools.js env:list
```

**功能详解**:

#### 项目分析 (`analyze`)

- 分析包大小和依赖关系
- 测量构建时间
- 检查代码质量指标
- 生成性能报告

#### 代码质量检查 (`lint`)

- 运行 ESLint 检查
- 统计错误和警告数量
- 生成详细报告
- 支持自动修复

#### 类型检查 (`type-check`)

- 运行 TypeScript 类型检查
- 检查所有包的类型定义
- 生成类型错误报告

#### 环境变量管理 (`env:*`)

- `env:check`: 显示当前环境变量
- `env:validate`: 验证环境变量完整性
- `env:create`: 创建环境文件模板
- `env:local`: 创建本地环境文件
- `env:list`: 列出所有环境文件

**配置选项**:

- 通过环境变量配置检查规则
- 支持自定义忽略文件
- 可配置超时时间
- 支持并行处理
- 可配置输出格式
- 支持自定义检查规则
- 可配置日志级别

### 2. `create-package.js` - 包创建工具

**功能**: 快速创建新的 npm 包，自动生成标准目录结构和配置文件

**使用方法**:

```bash
# 创建新包
node scripts/create-package.js <package-name>

# 显示帮助信息
node scripts/create-package.js help
```

**示例**:

```bash
node scripts/create-package.js my-utility
```

**生成的文件结构**:

```
packages/my-utility/
├── package.json          # 包配置文件
├── tsconfig.json         # TypeScript配置
├── vite.config.ts        # Vite构建配置
├── vitest.config.ts      # 测试配置
├── src/
│   └── index.ts          # 主入口文件
└── tests/
    └── index.test.ts     # 测试文件
```

**自动配置内容**:

- 包名格式: `@imtp/<package-name>`
- 标准脚本: build, test, lint, clean
- 开发依赖: TypeScript, Vite, Vitest
- 发布配置: public access
- 类型定义: 自动生成 index.d.ts
- 测试配置: 支持覆盖率报告
- 构建配置: 支持多种输出格式
- 文档配置: 自动生成API文档

**验证规则**:

- 包名只能包含小写字母、数字和连字符
- 必须以字母开头
- 检查包名是否已存在
- 验证包名格式符合npm规范
- 检查目录权限和可用性
- 验证包名长度和格式
- 检查依赖冲突

### 3. `dependency-manager.js` - 依赖管理工具

**功能**: 智能管理项目依赖，包括更新、冲突检测、安全扫描

**使用方法**:

```bash
# 检查依赖更新
node scripts/dependency-manager.js updates

# 检测依赖冲突
node scripts/dependency-manager.js conflicts

# 安全扫描
node scripts/dependency-manager.js security

# 清理无用依赖
node scripts/dependency-manager.js cleanup

# 包大小分析
node scripts/dependency-manager.js size

# 生成依赖报告
node scripts/dependency-manager.js report

# 运行所有检查
node scripts/dependency-manager.js
```

## 🌍 环境管理脚本

### 1. `env-manager.js` - 环境变量管理器

**功能**: 统一管理项目环境变量，支持多环境配置

**使用方法**:

```bash
# 检查环境变量
node scripts/env-manager.js check

# 验证环境变量
node scripts/env-manager.js validate

# 创建环境文件
node scripts/env-manager.js create [type]

# 列出环境文件
node scripts/env-manager.js list

# 显示帮助信息
node scripts/env-manager.js help
```

**支持的环境类型**:

- `development` - 开发环境
- `production` - 生产环境
- `test` - 测试环境
- `local` - 本地环境

**环境文件优先级**:

1. `.env.local` (最高优先级，不提交到版本控制)
2. `.env.[mode].local`
3. `.env.[mode]`
4. `.env` (最低优先级)

### 2. `validate-env.js` - 环境变量验证器

**功能**: 验证环境变量的完整性和正确性

**使用方法**:

```bash
# 验证环境变量
node scripts/validate-env.js
```

**验证内容**:

- 必需环境变量检查
- 环境变量类型验证
- 环境变量格式验证
- 敏感信息检查
- 数据库、Redis、JWT、API、邮件、第三方服务配置验证

**必需环境变量**:

- `DATABASE_URL` - 数据库连接字符串
- `JWT_SECRET` - JWT密钥

**可选环境变量**:

- `API_BASE_URL` - API基础地址
- `REDIS_URL` - Redis连接地址
- `SMTP_*` - 邮件服务配置
- `GOOGLE_*` - Google服务配置
- `UPLOAD_*` - 文件上传配置
- `SENTRY_DSN` - 监控配置

### 3. `test-env.js` - 环境测试工具

**功能**: 测试和显示环境配置信息

**使用方法**:

```bash
# 测试和显示环境配置
node scripts/test-env.js
```

**功能详解**:

- 按照 Vite 优先级顺序加载环境文件
- 显示当前环境变量配置
- 检测当前运行环境（开发/生产/测试）
- 验证关键环境变量是否存在
- 提供环境配置的调试信息

## 🔤 类型生成脚本

### 1. `generate-types.js` - TypeScript类型生成器

**功能**: 从多种源自动生成 TypeScript 类型定义

**使用方法**:

```bash
# 生成所有类型
node scripts/generate-types.js generate

# 显示帮助信息
node scripts/generate-types.js help
```

**支持的源类型**:

- **API接口**: Swagger/OpenAPI 文档
- **数据库模型**: Prisma/Sequelize/TypeORM 模式
- **环境变量**: .env 文件
- **配置文件**: JSON 配置文件

**配置选项**:

```javascript
const CONFIG = {
  sources: {
    api: {
      type: 'swagger',
      url: 'http://localhost:3000/api-docs',
      output: 'packages/types/src/api/generated',
    },
    database: {
      type: 'prisma',
      schema: 'prisma/schema.prisma',
      output: 'packages/types/src/database/generated',
    },
    env: {
      type: 'env',
      file: 'env.example',
      output: 'packages/types/src/env/generated',
    },
    config: {
      type: 'json',
      files: ['config/*.json'],
      output: 'packages/types/src/config/generated',
    },
  },
  output: {
    types: true, // 生成类型文件
    docs: true, // 生成文档
    tests: true, // 生成测试
    format: true, // 格式化代码
  },
};
```

**生成的文件结构**:

```
packages/types/src/
├── api/generated/
│   ├── api.ts
│   └── openapi.ts
├── database/generated/
│   └── database.ts
├── env/generated/
│   └── env.ts
└── config/generated/
    └── config.ts
```

### 2. `generate-api.js` - API类型生成器

**功能**: 专门用于从 API 文档生成 TypeScript 类型

**使用方法**:

```bash
# 生成 API 类型
node scripts/generate-api.js

# 显示帮助信息
node scripts/generate-api.js help
```

**特性**:

- 支持 Swagger/OpenAPI 文档
- 自动安装依赖工具
- 容错处理（API服务未运行时生成示例）
- 可配置输出路径

**环境变量配置**:

- `API_BASE_URL` - API基础地址
- `API_DOCS_URL` - API文档地址
- `API_TYPES_OUTPUT` - 输出文件路径

**示例输出**:

```typescript
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  code?: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🚀 CI/CD 脚本

### `ci-cd.js` - CI/CD 流程管理器

**功能**: 管理持续集成和部署流程

**使用方法**:

```bash
# 运行完整 CI/CD 流程
node scripts/ci-cd.js pipeline

# 运行发布流程
node scripts/ci-cd.js release

# 运行发布预览
node scripts/ci-cd.js release:dry-run

# 分析提交历史
node scripts/ci-cd.js analyze

# 显示帮助信息
node scripts/ci-cd.js help
```

**CI/CD 流程**:

1. **代码质量检查**: Lint + 类型检查
2. **测试**: 运行所有测试
3. **安全扫描**: 依赖安全检查
4. **构建**: 项目构建
5. **发布**: 版本发布（可选）

## 🏗️ 构建和测试脚本

### 1. 构建脚本

#### `build` - 标准构建

```bash
pnpm build
```

- 构建所有包
- 生成 ESM、CJS、UMD 格式
- 生成类型定义文件

#### `build:min` - 最小化构建

```bash
pnpm build:min
```

- 生成压缩版本
- 使用 Terser 进行代码压缩
- 生成 `.min.js` 文件

#### `build:clean` - 清理构建

```bash
pnpm build:clean
```

- 清理旧的构建文件
- 重新构建所有包

### 2. 测试脚本

#### `test` - 标准测试

```bash
pnpm test
```

- 运行所有包的测试
- 使用 Vitest 测试框架
- 支持 TypeScript

#### `test:ui` - UI测试

```bash
pnpm test:ui
```

- 启动测试UI界面
- 可视化测试结果
- 支持交互式调试

#### `test:coverage` - 覆盖率测试

```bash
pnpm test:coverage
```

- 生成测试覆盖率报告
- 使用 V8 覆盖率工具
- 输出详细覆盖率信息

#### `test:watch` - 监听测试

```bash
pnpm test:watch
```

- 监听文件变化
- 自动重新运行测试
- 提高开发效率

### 3. 清理脚本

#### `clean` - 标准清理

```bash
pnpm clean
```

- 清理所有包的 dist 目录
- 删除构建产物

#### `clean:all` - 完全清理

```bash
pnpm clean:all
```

- 清理根目录和所有包
- 删除所有构建文件

## 🎯 代码质量脚本

### 1. `lint` - 代码检查

```bash
pnpm lint
```

- 运行 ESLint 检查
- 检查代码风格和潜在问题
- 支持 TypeScript 和 Vue

### 2. `format` - 代码格式化

```bash
pnpm format
```

- 使用 Prettier 格式化代码
- 统一代码风格

### 3. `type-check` - 类型检查

```bash
pnpm type-check
```

- 运行 TypeScript 类型检查
- 检查所有类型定义
- 生成类型错误报告

### 4. `pre-commit.js` - 预提交检查

```bash
# 运行预提交检查
node scripts/pre-commit.js
```

- Git 预提交钩子
- 运行 lint-staged 进行代码格式化和检查
- 确保代码质量
- 自动修复可修复的问题

## 📊 监控和备份脚本

### 1. `monitor.js` - 性能监控工具

**功能**: 监控项目性能指标，生成分析报告

**使用方法**:

```bash
# 监控构建性能
node scripts/monitor.js build

# 监控测试性能
node scripts/monitor.js test

# 监控安全状态
node scripts/monitor.js security

# 监控所有指标
node scripts/monitor.js all

# 生成报告
node scripts/monitor.js report

# 显示帮助信息
node scripts/monitor.js help
```

**监控指标**:

- 构建时间和成功率
- 测试覆盖率和执行时间
- 包大小和依赖分析
- 安全漏洞检查
- 性能趋势分析

**配置选项**:

```javascript
const MONITOR_CONFIG = {
  buildTimeout: 300000, // 构建超时时间
  testTimeout: 60000, // 测试超时时间
  maxPackageSize: 1024 * 1024, // 最大包大小
  logFile: 'monitor-logs.json', // 日志文件
};
```

**输出文件**:

- `monitor-logs.json` - 监控日志
- `monitor-report.json` - 分析报告

### 2. `rollback.js` - 备份回滚工具

**功能**: 创建项目备份，支持版本回滚

**使用方法**:

```bash
# 创建备份
node scripts/rollback.js create

# 列出备份
node scripts/rollback.js list

# 执行回滚
node scripts/rollback.js rollback <backup-name>

# 清理旧备份
node scripts/rollback.js cleanup

# 显示帮助信息
node scripts/rollback.js help
```

**备份内容**:

- 包版本信息
- Git 提交信息
- 包依赖关系
- 配置文件

**配置选项**:

```javascript
const ROLLBACK_CONFIG = {
  maxBackups: 5, // 最大备份数量
  backupDir: '.backups', // 备份目录
  npmRegistry: 'https://registry.npmjs.org',
};
```

**备份文件结构**:

```
.backups/
├── backup-2024-01-01T10-00-00-000Z/
│   ├── backup-info.json
│   └── packages/
└── backup-2024-01-02T10-00-00-000Z/
    ├── backup-info.json
    └── packages/
```

## 🛠️ 工具脚本

### 1. `build-min.js` - 最小化构建工具

**功能**: 为构建产物生成压缩版本

**使用方法**:

```bash
# 为当前目录生成 min 版本
node scripts/build-min.js

# 为指定包生成 min 版本
node scripts/build-min.js [package-path]
```

**功能详解**:

- 支持 ESM、CJS、UMD 格式的压缩
- 使用 Terser 进行代码压缩和混淆
- 自动生成 `.min.js` 文件
- 支持指定包路径或使用当前目录
- 跳过不存在的文件和目录
- 移除注释，优化代码大小

### 2. `update-lint-scripts.js` - Lint脚本更新器

**功能**: 更新所有包的 lint 脚本配置，添加 `--no-warn-ignored` 参数

**使用方法**:

```bash
# 更新所有包的 lint 脚本
node scripts/update-lint-scripts.js
```

**功能详解**:

- 遍历所有包的 package.json 文件
- 检查 lint 脚本是否包含 `--no-warn-ignored` 参数
- 自动添加缺失的参数
- 避免 ESLint 忽略文件的警告
- 支持批量更新和回滚
- 提供详细的更新报告
- 支持自定义更新规则
- 提供更新预览功能

### 3. `deploy-docs.js` - 文档部署工具

**功能**: 自动化构建和部署文档站点

**使用方法**:

```bash
# 构建和部署文档
node scripts/deploy-docs.js
```

**功能详解**:

- 清理旧的构建文件
- 安装项目依赖
- 构建 VitePress 文档
- 提供多种部署选项（GitHub Pages、Netlify、Vercel、手动部署）
- 检查构建结果
- 支持自定义构建配置
- 提供部署状态反馈
- 支持增量构建
- 提供构建性能分析

**注意**:

- `cleanup-scripts.js` 文件目前为空，暂未实现功能
- GraphQL 类型生成使用 `codegen.yml` 配置文件，需要单独运行 `npx graphql-codegen`
- 所有脚本都支持 `help` 参数显示帮助信息
- 部分脚本需要特定的环境变量配置
- 建议在首次使用前运行 `pnpm env:validate` 检查环境配置
- 某些脚本需要管理员权限或特定目录权限
- 建议定期运行 `pnpm deps:security` 检查安全漏洞

## 📚 使用指南

### 🚀 快速开始

```bash
# 1. 启动交互式工具
pnpm interactive

# 2. 验证环境配置
pnpm env:validate

# 3. 运行测试
pnpm test

# 4. 构建项目
pnpm build

# 5. 检查代码质量
pnpm lint
pnpm type-check
```

### 开发工作流

#### 新功能开发

```bash
# 1. 启动交互式工具
pnpm interactive

# 2. 选择开发工具 -> 创建新包
# 或者直接使用命令
node scripts/create-package.js <package-name>

# 3. 设置环境
pnpm env:create local

# 4. 开发代码
# ... 编写代码 ...

# 5. 运行测试
pnpm test

# 6. 检查代码质量
pnpm lint
pnpm type-check

# 7. 构建
pnpm build
```

#### 类型生成工作流

```bash
# 使用交互式工具
pnpm interactive
# 选择生成工具 -> 生成所有类型

# 或者直接使用命令
pnpm generate:all

# 或者分别生成
pnpm generate:types
pnpm generate:api

# GraphQL 类型生成 (需要配置 codegen.yml)
npx graphql-codegen
```

### 构建和测试工作流

```bash
# 使用交互式工具
pnpm interactive
# 选择构建工具或测试工具

# 或者直接使用命令
pnpm build
pnpm build:min
pnpm build:clean
pnpm test
pnpm test:coverage
pnpm test:ui
pnpm test:watch
```

#### 发布工作流

```bash
# 1. 运行所有检查
pnpm lint
pnpm type-check
pnpm test

# 2. 构建
pnpm build

# 3. 创建变更集
pnpm changeset

# 4. 发布
pnpm release

# 或者使用 CI/CD 流程
node scripts/ci-cd.js release
```

### 依赖管理

```bash
# 使用交互式工具
pnpm interactive
# 选择依赖管理

# 或者直接使用命令
pnpm deps
pnpm deps:updates
pnpm deps:conflicts
pnpm deps:security
pnpm deps:cleanup
```

### 环境管理

```bash
# 使用交互式工具
pnpm interactive
# 选择环境管理

# 或者直接使用命令
pnpm env:create <environment>
pnpm env:validate
pnpm env:check
pnpm env:list
```

### 监控和备份

```bash
# 使用交互式工具
pnpm interactive
# 选择监控管理或备份管理

# 或者直接使用命令
pnpm monitor <type>
pnpm monitor:build
pnpm monitor:test
pnpm monitor:security
pnpm monitor:all
node scripts/rollback.js create
node scripts/rollback.js list
```

### CI/CD 流程

```bash
# 使用交互式工具
pnpm interactive
# 选择 CI/CD 工具

# 或者直接使用命令
node scripts/ci-cd.js pipeline
node scripts/ci-cd.js release
node scripts/ci-cd.js release:dry-run
node scripts/ci-cd.js analyze
```

### 代码质量工作流

```bash
# 使用交互式工具
pnpm interactive
# 选择开发工具 -> 代码质量检查

# 或者直接使用命令
pnpm lint
pnpm format
pnpm type-check
```

### 文档工作流

```bash
# 使用交互式工具
pnpm interactive
# 选择开发工具 -> 文档管理

# 或者直接使用命令
pnpm docs:dev
pnpm docs:build
pnpm docs:preview
pnpm docs:deploy
```

## 🔧 故障排除

### 常见问题

| 问题           | 解决方案                         |
| -------------- | -------------------------------- |
| 环境变量未加载 | `pnpm env:validate`              |
| 类型生成失败   | `node scripts/generate-api.js`   |
| 构建失败       | `pnpm clean:all && pnpm install` |
| 测试失败       | `node scripts/test-env.js`       |
| 代码检查失败   | `pnpm format`                    |
| 依赖冲突       | `pnpm deps:conflicts`            |
| 安全漏洞       | `pnpm deps:security`             |
| 监控异常       | `pnpm monitor:all`               |
| 交互式工具异常 | 重启终端或检查 Node.js 版本      |
| 权限问题       | 检查文件权限和目录访问权限       |

### 调试命令

```bash
# 启用调试模式
export DEBUG=true

# 查看监控日志
cat monitor-logs.json

# 分析构建性能
time pnpm build

# 查看环境配置
node scripts/test-env.js

# 验证环境变量
node scripts/validate-env.js

# 检查脚本帮助
node scripts/<script-name> help

# 查看包依赖关系
pnpm deps

# 检查系统信息
node --version
pnpm --version

# 查看项目结构
tree -L 3 -I node_modules
```

## 📈 优化计划

- 🔄 实现更智能的依赖管理
- 🔄 添加更多自动化测试场景
- 🔄 优化构建缓存策略
- 🔄 增强错误诊断能力
- 🔄 完善 CI/CD 流程自动化
- 🔄 实现 cleanup-scripts.js 功能
- 🔄 添加更多监控指标
- 🔄 增强交互式界面功能
- 🔄 添加更多类型生成源
- 🔄 优化构建性能监控
- 🔄 添加脚本性能分析
- 🔄 实现智能配置推荐
- 🔄 增强安全性检查
- 🔄 优化用户体验
