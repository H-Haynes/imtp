# TypeScript 类型自动生成工具指南

## 🚀 概述

本项目提供了一套完整的 TypeScript 类型自动生成工具链，支持从多种数据源自动生成类型定义。

## 📦 已安装的工具

### 1. **TypeDoc** - 文档生成

- 从 TypeScript 代码生成 API 文档
- 支持 Markdown 输出
- 自动生成类型索引

### 2. **OpenAPI TypeScript** - API 类型生成

- 从 OpenAPI/Swagger 规范生成 TypeScript 类型
- 支持 REST API 类型定义
- 自动生成请求/响应类型

### 3. **Swagger TypeScript API** - Swagger 客户端生成

- 从 Swagger 文档生成完整的 API 客户端
- 包含类型安全的请求方法
- 自动生成错误处理

### 4. **GraphQL Code Generator** - GraphQL 类型生成

- 从 GraphQL Schema 生成 TypeScript 类型
- 支持 React Apollo hooks
- 自动生成查询和变更类型

### 5. **自定义类型生成器** - 综合工具

- 从环境变量生成类型
- 从配置文件生成类型
- 从数据库模型生成类型

## 🛠️ 使用方法

### 快速开始

```bash
# 生成所有类型
pnpm generate:all

# 或者分步生成
pnpm generate:types    # 自定义类型生成器
pnpm generate:api      # OpenAPI 类型
pnpm generate:graphql  # GraphQL 类型
pnpm docs             # 生成文档
```

### 1. 环境变量类型生成

```bash
# 从 env.example 生成环境变量类型
pnpm generate:types
```

生成的类型示例：

```typescript
// packages/types/src/env/generated/env.ts
export interface Env {
  NODE_ENV: string;
  DEBUG: boolean;
  PORT: number;
  HOST: string;
  DATABASE_URL: string;
  // ... 其他环境变量
}
```

### 2. API 类型生成

```bash
# 从 Swagger/OpenAPI 文档生成类型
pnpm generate:api
```

生成的类型示例：

```typescript
// packages/types/src/api/generated/openapi.ts
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  code?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}
```

### 3. GraphQL 类型生成

```bash
# 从 GraphQL Schema 生成类型
pnpm generate:graphql
```

生成的类型示例：

```typescript
// packages/types/src/graphql/generated/
export interface GetUserQuery {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface CreateUserMutation {
  createUser: {
    id: string;
    name: string;
    email: string;
  };
}
```

### 4. 文档生成

```bash
# 生成 API 文档
pnpm docs
```

生成的文档位于 `docs/` 目录。

## ⚙️ 配置说明

### 自定义类型生成器配置

编辑 `scripts/generate-types.js` 中的 `CONFIG` 对象：

```javascript
const CONFIG = {
  sources: {
    // API 接口配置
    api: {
      type: 'swagger', // swagger, openapi, graphql
      url: 'http://localhost:3000/api-docs',
      output: 'packages/types/src/api/generated',
    },
    // 数据库配置
    database: {
      type: 'prisma', // prisma, sequelize, typeorm
      schema: 'prisma/schema.prisma',
      output: 'packages/types/src/database/generated',
    },
    // 环境变量配置
    env: {
      type: 'env',
      file: 'env.example',
      output: 'packages/types/src/env/generated',
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

### TypeDoc 配置

编辑 `typedoc.json`：

```json
{
  "entryPoints": [
    "packages/core/src/index.ts",
    "packages/ui/src/index.ts",
    "packages/data/src/index.ts"
  ],
  "out": "docs",
  "theme": "default",
  "name": "IMTP Documentation"
}
```

### GraphQL Code Generator 配置

编辑 `codegen.yml`：

```yaml
overwrite: true
schema: 'http://localhost:4000/graphql'
documents: 'packages/types/src/graphql/**/*.graphql'
generates:
  packages/types/src/graphql/generated/:
    preset: 'client'
    plugins:
      - 'typescript'
      - 'typescript-operations'
```

## 📁 生成的文件结构

```
packages/types/src/
├── api/
│   └── generated/
│       ├── api.ts          # 基础 API 类型
│       └── openapi.ts      # OpenAPI 生成的类型
├── database/
│   └── generated/
│       └── database.ts     # 数据库模型类型
├── env/
│   └── generated/
│       └── env.ts          # 环境变量类型
├── graphql/
│   ├── queries/            # GraphQL 查询文件
│   ├── mutations/          # GraphQL 变更文件
│   └── generated/          # 生成的 GraphQL 类型
├── config/
│   └── generated/
│       └── config.ts       # 配置类型
└── generated/
    └── index.ts            # 类型索引文件
```

## 🔧 高级用法

### 1. 监听模式

```bash
# 文件变化时自动生成类型
node scripts/generate-types.js watch
```

### 2. 自定义类型推断

在 `scripts/generate-types.js` 中修改 `inferEnvType` 方法：

```javascript
inferEnvType(value) {
  if (value === 'true' || value === 'false') return 'boolean';
  if (!isNaN(Number(value))) return 'number';
  if (value.includes(',')) return 'string[]';
  if (value.includes('|')) return `'${value.split('|').join("' | '")}'`;
  return 'string';
}
```

### 3. 集成到 CI/CD

在 GitHub Actions 中添加：

```yaml
- name: Generate Types
  run: |
    pnpm generate:all
    git add packages/types/src/generated/
    git commit -m "chore: update generated types"
```

### 4. 类型验证

```bash
# 验证生成的类型
pnpm type-check
```

## 🎯 最佳实践

### 1. 类型生成策略

- **开发阶段**: 使用监听模式自动生成
- **提交前**: 运行 `pnpm generate:all` 确保类型最新
- **CI/CD**: 自动生成并验证类型一致性

### 2. 类型组织

- 将生成的类型放在 `generated/` 目录
- 手动编写的类型放在对应功能目录
- 使用索引文件统一导出

### 3. 版本控制

- 将生成的类型文件加入版本控制
- 在 `.gitignore` 中排除临时文件
- 使用 `pnpm generate:all` 确保一致性

### 4. 文档维护

- 定期运行 `pnpm docs` 更新文档
- 在 README 中说明类型生成流程
- 为自定义类型添加 JSDoc 注释

## 🐛 常见问题

### Q: 生成的类型不准确怎么办？

A: 检查源数据格式，调整类型推断逻辑，或手动修正生成的类型。

### Q: 如何添加新的数据源？

A: 在 `scripts/generate-types.js` 中添加新的生成方法，并在 `CONFIG.sources` 中配置。

### Q: 生成的类型文件很大怎么办？

A: 使用 `exclude` 配置排除不需要的类型，或拆分生成策略。

### Q: 如何自定义类型命名？

A: 修改生成器中的类型命名逻辑，或使用 TypeScript 的 `type` 别名。

## 📚 相关资源

- [TypeDoc 官方文档](https://typedoc.org/)
- [OpenAPI TypeScript](https://github.com/drwpow/openapi-typescript)
- [GraphQL Code Generator](https://www.graphql-code-generator.com/)
- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进类型生成工具！

---

_最后更新: 2024年_
