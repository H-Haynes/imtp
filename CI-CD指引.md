# CI/CD 使用指南

## 📋 概述

本项目实现了完整的 CI/CD 流程，包括自动化构建、测试、部署和监控。

## 🚀 工作流程

### 1. 主要 CI/CD 流程 (`.github/workflows/ci.yml`)

**触发条件：**

- 推送到 `main` 或 `develop` 分支
- 创建 Pull Request 到 `main` 或 `develop` 分支

**执行步骤：**

1. **环境验证** - 验证环境配置文件
2. **代码质量检查** - Lint、格式化、类型检查
3. **类型生成** - 生成和验证 TypeScript 类型
4. **测试** - 多版本 Node.js 测试
5. **构建** - 构建所有包
6. **安全扫描** - 依赖安全审计
7. **文档生成** - 生成 API 文档
8. **发布** - 自动发布到 npm (仅 main 分支)
9. **部署文档** - 部署到 GitHub Pages (仅 main 分支)
10. **通知** - 发送部署结果通知

### 2. 快速部署流程 (`.github/workflows/deploy.yml`)

**触发条件：**

- 手动触发 (workflow_dispatch)

**功能：**

- 支持选择部署环境 (staging/production)
- 支持指定部署包
- 包含预部署检查和后验证

## 🔧 环境管理

### 环境配置文件

项目支持多环境配置：

- `.env.development` - 开发环境
- `.env.test` - 测试环境
- `.env.production` - 生产环境

### 环境管理命令

```bash
# 验证环境配置
pnpm env:validate [environment]

# 检查环境一致性
pnpm env:check

# 创建环境文件
pnpm env:create <environment>

# 列出所有环境
pnpm env:list
```

### 环境变量要求

**开发环境必需变量：**

- `NODE_ENV`
- `DEBUG`

**测试环境必需变量：**

- `NODE_ENV`

**生产环境必需变量：**

- `NODE_ENV`
- `API_URL`

## 🔄 回滚机制

### 自动回滚

当发布失败时，CI/CD 会自动执行回滚操作：

1. 备份当前版本信息
2. 回滚 Git 到上一个提交
3. 恢复包版本号
4. 重新安装依赖和构建

### 手动回滚

```bash
# 创建备份
pnpm backup:create

# 列出备份
pnpm backup:list

# 执行回滚
pnpm backup:rollback <backup-name>

# 清理旧备份
pnpm backup:cleanup
```

## 🔒 安全扫描

### 自动安全检查

CI/CD 包含以下安全检查：

1. **依赖审计** - 检查 npm 包漏洞
2. **代码扫描** - 检查代码中的敏感信息
3. **Snyk 扫描** - 第三方安全扫描

### 手动安全检查

```bash
# 运行安全审计
pnpm security:audit

# 运行 Snyk 扫描
pnpm security:scan
```

## 📊 性能监控

### 构建性能监控

CI/CD 会监控：

- 构建时间
- 包大小
- 构建成功率

### 手动性能检查

```bash
# 监控构建性能
pnpm monitor:build

# 监控测试性能
pnpm monitor:test

# 监控安全状态
pnpm monitor:security

# 全面监控
pnpm monitor:all

# 生成监控报告
pnpm monitor:report
```

## 🔔 通知机制

### 通知渠道

当前支持的通知方式：

- GitHub Actions 日志
- 可扩展为 Slack、Discord、邮件等

### 通知内容

**成功通知：**

- 项目名称
- 分支信息
- 提交哈希
- 部署时间

**失败通知：**

- 失败原因
- 失败作业
- 回滚状态

## 🛠️ 本地开发

### 环境设置

1. 复制环境配置：

```bash
cp env.example .env.development
```

2. 修改环境变量：

```bash
# 编辑 .env.development 文件
vim .env.development
```

3. 验证环境配置：

```bash
pnpm env:validate development
```

### 本地测试

```bash
# 运行所有测试
pnpm test

# 运行测试覆盖率
pnpm test:coverage

# 运行 lint 检查
pnpm lint

# 类型检查
pnpm type-check
```

### 本地构建

```bash
# 构建所有包
pnpm build

# 构建并压缩
pnpm build:min

# 清理构建文件
pnpm clean
```

## 📈 最佳实践

### 1. 提交规范

使用语义化提交信息：

```
feat: 添加新功能
fix: 修复 bug
docs: 更新文档
style: 代码格式化
refactor: 代码重构
test: 添加测试
chore: 构建过程或辅助工具的变动
```

### 2. 分支策略

- `main` - 生产环境分支
- `develop` - 开发环境分支
- `feature/*` - 功能分支
- `hotfix/*` - 热修复分支

### 3. 版本管理

使用 Changesets 进行版本管理：

```bash
# 创建变更集
pnpm changeset

# 更新版本
pnpm version-packages

# 发布
pnpm release
```

### 4. 监控指标

定期检查以下指标：

- 构建成功率
- 测试覆盖率
- 安全漏洞数量
- 构建时间趋势
- 包大小变化

## 🚨 故障排除

### 常见问题

1. **构建失败**
   - 检查依赖是否正确安装
   - 验证环境变量配置
   - 查看构建日志

2. **测试失败**
   - 检查测试环境配置
   - 验证测试数据
   - 查看测试覆盖率

3. **发布失败**
   - 检查 npm token 配置
   - 验证包版本号
   - 查看发布日志

4. **回滚失败**
   - 检查备份文件
   - 验证 Git 状态
   - 手动执行回滚

### 获取帮助

- 查看 GitHub Actions 日志
- 检查监控报告
- 查看项目文档
- 联系项目维护者

## 📚 相关文档

- [项目提升分析](./项目提升分析.md)
- [项目设置](./项目设置.md)
- [环境配置](./env.md)
- [API 文档](./docs/)
