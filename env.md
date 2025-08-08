# 环境变量配置文档

## 📋 目录

- [概述](#概述)
- [环境文件系统](#环境文件系统)
- [支持的环境](#支持的环境)
- [快速开始](#快速开始)
- [在代码中使用](#在代码中使用)
- [环境管理工具](#环境管理工具)
- [验证和调试](#验证和调试)
- [最佳实践](#最佳实践)
- [故障排除](#故障排除)
- [API 参考](#api-参考)

## 概述

IMTP 项目采用了类似 Vite 的多环境文件配置系统，支持根据不同环境自动加载对应的配置文件。这种设计提供了灵活、安全和标准化的环境变量管理方案。

### ✨ 主要特性

- **多环境支持**: 开发、生产、测试环境独立配置
- **优先级加载**: 类似 Vite 的文件加载优先级
- **类型安全**: 完整的 TypeScript 类型支持
- **验证机制**: 内置环境变量验证
- **管理工具**: 便捷的环境文件管理脚本
- **安全隔离**: 敏感信息与代码分离
- **智能加载**: 自动按优先级加载环境文件
- **配置组管理**: 按功能分组的配置管理

## 环境文件系统

### 文件优先级

按照以下优先级顺序加载环境变量（高优先级覆盖低优先级）：

```
1. .env.local                    # 最高优先级，本地配置（不提交到版本控制）
2. .env.[mode].local            # 环境特定的本地配置
3. .env.[mode]                  # 环境特定配置
4. .env                         # 基础配置（最低优先级）
```

### 文件结构

```
imtp/
├── config/
│   └── env.ts                    # 环境变量加载逻辑
├── scripts/
│   ├── env-manager.js            # 环境管理工具
│   ├── test-env.js               # 环境测试脚本
│   └── validate-env.js           # 环境验证脚本
├── examples/
│   └── env-usage.ts              # 使用示例
├── env.example                   # 基础配置示例
├── env.development.example       # 开发环境配置示例
├── env.production.example        # 生产环境配置示例
├── env.test.example              # 测试环境配置示例
├── .env.local                    # 本地配置（不提交）
├── .env.development              # 开发环境配置
├── .env.production               # 生产环境配置
└── .env.test                     # 测试环境配置
```

### 🔧 核心改进

#### 1. 智能加载机制

```typescript
// config/env.ts
const loadEnvFiles = () => {
  const envFiles = [
    '.env',
    `.env.${NODE_ENV}`,
    `.env.${NODE_ENV}.local`,
    '.env.local',
  ];

  // 从低优先级到高优先级加载
  envFiles.reverse().forEach(file => {
    const envPath = resolve(process.cwd(), file);
    config({ path: envPath });
  });
};
```

#### 2. 环境检测函数

```typescript
export const isDev = () => env.NODE_ENV === 'development';
export const isProd = () => env.NODE_ENV === 'production';
export const isTest = () => env.NODE_ENV === 'test';
```

#### 3. 配置组管理

```typescript
export const getConfig = {
  server: () => ({ port: env.PORT, host: env.HOST, debug: env.DEBUG }),
  database: () => ({ url: env.DATABASE_URL, name: env.DATABASE_NAME }),
  redis: () => ({
    url: env.REDIS_URL,
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
  }),
  // ... 更多配置组
};
```

## 支持的环境

| 环境          | 说明     | 配置文件           |
| ------------- | -------- | ------------------ |
| `development` | 开发环境 | `.env.development` |
| `production`  | 生产环境 | `.env.production`  |
| `test`        | 测试环境 | `.env.test`        |

## 快速开始

### 1. 创建环境文件

使用内置的环境管理工具：

```bash
# 创建开发环境配置
pnpm env:create development

# 创建生产环境配置
pnpm env:create production

# 创建测试环境配置
pnpm env:create test

# 创建本地环境配置（不提交到版本控制）
pnpm env:local

# 查看所有环境文件状态
pnpm env:list
```

### 2. 手动创建环境文件

你也可以手动复制示例文件：

```bash
# 复制示例文件
cp env.development.example .env.development
cp env.production.example .env.production
cp env.test.example .env.test

# 创建本地配置
cp env.example .env.local
```

### 3. 配置环境变量

编辑对应的环境文件，设置你的配置值：

```bash
# 编辑开发环境配置
vim .env.development

# 编辑本地配置（覆盖其他配置）
vim .env.local
```

## 在代码中使用

### 基本用法

```typescript
import { env, isDev, isProd, getConfig } from './config/env';

// 直接使用环境变量
console.log(env.PORT);
console.log(env.DATABASE_URL);

// 环境检测
if (isDev()) {
  console.log('开发环境');
}

if (isProd()) {
  console.log('生产环境');
}

// 使用配置组
const dbConfig = getConfig.database();
const serverConfig = getConfig.server();
```

### 配置组使用

```typescript
import { getConfig } from './config/env';

// 服务器配置
const serverConfig = getConfig.server();
// { port: 3000, host: 'localhost', debug: true }

// 数据库配置
const dbConfig = getConfig.database();
// { url: 'postgresql://...', name: 'imtp_dev' }

// Redis配置
const redisConfig = getConfig.redis();
// { url: 'redis://localhost:6379', host: 'localhost', port: 6379 }

// JWT配置
const jwtConfig = getConfig.jwt();
// { secret: 'your-secret', expiresIn: '7d' }

// API配置
const apiConfig = getConfig.api();
// { baseUrl: 'http://localhost:3000/api', timeout: 5000 }

// 文件上传配置
const uploadConfig = getConfig.upload();
// { maxSize: 10485760, allowedTypes: ['image/jpeg', 'image/png', 'image/gif'] }

// 邮件配置
const mailConfig = getConfig.mail();
// { host: 'smtp.gmail.com', port: 587, user: '...', pass: '...' }
```

### 环境验证

```typescript
import { validateEnv } from './config/env';

// 验证必需的环境变量
if (!validateEnv()) {
  console.error('环境变量验证失败');
  process.exit(1);
}
```

## 环境管理工具

### 命令行工具

```bash
# 环境管理
pnpm env:create <env>    # 创建指定环境的环境文件
pnpm env:local           # 创建本地环境文件
pnpm env:list            # 列出环境文件状态

# 环境验证
pnpm env:validate        # 验证环境变量（包含格式验证）
pnpm env:check           # 查看当前环境变量

# 环境切换
NODE_ENV=development pnpm env:validate  # 开发环境验证
NODE_ENV=production pnpm env:validate   # 生产环境验证
NODE_ENV=test pnpm env:validate        # 测试环境验证
```

### 统一开发工具

```bash
# 使用统一的开发工具
pnpm dev-tools env:check      # 环境变量检查
pnpm dev-tools env:validate   # 环境变量验证
pnpm dev-tools env:create development  # 创建开发环境文件
pnpm dev-tools env:create production   # 创建生产环境文件
pnpm dev-tools env:create test         # 创建测试环境文件
pnpm dev-tools env:local      # 创建本地环境文件
pnpm dev-tools env:list       # 列出环境文件
```

## 验证和调试

### 环境变量验证

验证脚本会检查以下内容：

1. **必需变量**: `DATABASE_URL`, `JWT_SECRET`
2. **端口范围**: 所有端口必须在 1-65535 之间
3. **超时时间**: API_TIMEOUT 必须大于 1000ms
4. **文件大小**: UPLOAD_MAX_SIZE 必须大于 1024 字节

### 验证示例

```bash
# 开发环境验证
NODE_ENV=development pnpm env:validate

# 生产环境验证
NODE_ENV=production pnpm env:validate

# 测试环境验证
NODE_ENV=test pnpm env:validate
```

### 验证失败处理

如果验证失败，脚本会显示：

- 缺少的必需环境变量
- 格式错误的环境变量
- 具体的错误信息和解决建议

### 调试环境变量

```bash
# 查看当前加载的环境变量
pnpm env:check

# 查看特定环境的环境变量
NODE_ENV=development pnpm env:check
NODE_ENV=production pnpm env:check

# 查看环境文件状态
pnpm env:list
```

## 最佳实践

### 1. 安全配置

- **敏感信息隔离**: 敏感信息（密码、密钥）只放在 `.env.local` 中
- **版本控制**: 不要将 `.env.local` 提交到版本控制
- **生产环境**: 生产环境的敏感信息使用环境变量或密钥管理服务
- **密钥轮换**: 定期更换 JWT_SECRET 等敏感配置

### 2. 环境分离

- **开发环境**: 使用本地数据库，开启调试模式
- **测试环境**: 使用测试数据库，关闭调试模式
- **生产环境**: 使用生产数据库，关闭调试模式

### 3. 配置管理

- **基础配置**: 基础配置放在 `.env` 中
- **环境特定配置**: 环境特定配置放在 `.env.[mode]` 中
- **个人配置**: 个人配置放在 `.env.local` 中
- **配置文档**: 保持配置文件的文档化

### 4. 性能优化

- **缓存配置**: 在应用启动时加载并缓存配置
- **类型安全**: 使用 TypeScript 确保配置的类型安全
- **验证机制**: 在应用启动时验证必需配置

## 故障排除

### 环境变量未加载

1. **检查文件是否存在**: `pnpm env:list`
2. **检查文件权限**: 确保文件有读取权限
3. **检查文件格式**: 确保没有多余的空格或特殊字符
4. **检查环境变量**: 确认 NODE_ENV 设置正确

### 配置不生效

1. **确认优先级**: 检查环境文件加载优先级
2. **检查语法错误**: 确保配置文件格式正确
3. **重启应用**: 重启应用以重新加载配置
4. **检查缓存**: 清除可能的配置缓存

### 验证失败

1. **检查必需变量**: 确保所有必需的环境变量都已设置
2. **查看错误信息**: 查看验证失败的具体原因
3. **检查格式**: 确保配置值格式正确
4. **检查范围**: 确保数值在有效范围内

### 常见错误

```bash
# 错误：Missing required environment variables
# 解决：设置 DATABASE_URL 和 JWT_SECRET

# 错误：Invalid port number
# 解决：确保端口在 1-65535 范围内

# 错误：Invalid timeout value
# 解决：确保 API_TIMEOUT 大于 1000ms

# 错误：Invalid file size
# 解决：确保 UPLOAD_MAX_SIZE 大于 1024 字节
```

## API 参考

### 环境检测函数

```typescript
export const isDev = () => boolean; // 是否为开发环境
export const isProd = () => boolean; // 是否为生产环境
export const isTest = () => boolean; // 是否为测试环境
```

### 验证函数

```typescript
export const validateEnv = () => boolean; // 验证必需的环境变量
```

### 配置组

```typescript
export const getConfig = {
  server: () => ServerConfig;
  database: () => DatabaseConfig;
  redis: () => RedisConfig;
  jwt: () => JWTConfig;
  api: () => APIConfig;
  upload: () => UploadConfig;
  mail: () => MailConfig;
}
```

### 类型定义

```typescript
export type EnvConfig = typeof env;

interface ServerConfig {
  port: number;
  host: string;
  debug: boolean;
}

interface DatabaseConfig {
  url: string;
  name: string;
}

interface RedisConfig {
  url: string;
  host: string;
  port: number;
}

interface JWTConfig {
  secret: string;
  expiresIn: string;
}

interface APIConfig {
  baseUrl: string;
  timeout: number;
}

interface UploadConfig {
  maxSize: number;
  allowedTypes: string[];
}

interface MailConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
}
```
