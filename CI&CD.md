# 🚀 CI/CD 自动化部署指南

## 📋 概述

本项目已配置完整的 CI/CD 自动化部署流程，包括代码质量检查、测试、构建、安全扫描和自动化发布。

## 🔧 功能特性

### ✅ 已实现功能

1. **自动化测试**
   - 代码质量检查 (ESLint)
   - 类型检查 (TypeScript)
   - 单元测试 (Vitest)
   - 测试覆盖率报告

2. **自动化构建**
   - 多包构建 (Monorepo)
   - 最小化构建
   - 文档构建
   - 构建产物上传

3. **安全扫描**
   - 依赖安全扫描
   - 代码安全分析 (CodeQL)
   - 漏洞检测

4. **自动化发布**
   - 语义化版本控制
   - 自动生成变更日志
   - GitHub Release
   - NPM 发布

5. **文档部署**
   - 自动部署到 GitHub Pages
   - 文档站点更新

## 🛠️ 使用方法

### 本地执行

#### 1. 完整 CI/CD 流程

```bash
# 使用交互式工具
pnpm interactive
# 选择 CI/CD 工具 -> 执行完整 CI/CD 流程

# 或者直接使用命令
node scripts/ci-cd.js pipeline
```

#### 2. 发布流程

```bash
# 发布预览
node scripts/ci-cd.js release:dry

# 正式发布
node scripts/ci-cd.js release
```

#### 3. 分析提交历史

```bash
node scripts/ci-cd.js analyze
```

### GitHub Actions

当您推送代码到 `main` 分支时，会自动触发以下流程：

1. **测试阶段** - 代码检查、类型检查、测试
2. **构建阶段** - 项目构建、文档构建
3. **安全阶段** - 安全扫描、漏洞检测
4. **发布阶段** - 语义化发布、生成 Release
5. **部署阶段** - 文档部署到 GitHub Pages

## 📝 提交规范

项目使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

### 提交类型

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关
- `build`: 构建相关
- `ci`: CI/CD 相关
- `chore`: 其他杂项

### 提交示例

```bash
# 新功能
git commit -m "feat: 添加用户认证功能"

# 修复 bug
git commit -m "fix: 修复登录页面样式问题"

# 文档更新
git commit -m "docs: 更新 API 文档"

# 重大变更
git commit -m "feat!: 重构用户系统 API

BREAKING CHANGE: 用户 API 接口已更改，需要更新客户端代码"
```

## 🔐 环境配置

### GitHub Secrets

需要在 GitHub 仓库中配置以下 Secrets：

1. **NPM_TOKEN** - NPM 发布令牌

   ```bash
   # 生成 NPM 令牌
   npm token create --read-only
   ```

2. **GITHUB_TOKEN** - GitHub 令牌 (自动提供)

### 本地环境

```bash
# 设置 NPM 认证
npm login

# 配置 Git 用户信息
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

## 📊 监控和报告

### 执行状态

- ✅ **成功** - 所有检查通过
- ⚠️ **警告** - 部分检查失败，但不影响发布
- ❌ **失败** - 关键检查失败，阻止发布

### 报告内容

- 测试覆盖率
- 构建时间
- 安全扫描结果
- 发布状态
- 部署状态

## 🚨 故障排除

### 常见问题

1. **提交被拒绝**
   - 检查提交消息格式
   - 确保代码通过所有检查

2. **构建失败**
   - 检查依赖安装
   - 查看构建日志
   - 验证配置文件

3. **发布失败**
   - 检查 NPM 认证
   - 验证版本号
   - 确认发布权限

### 调试命令

```bash
# 本地测试 CI/CD 流程
node scripts/ci-cd.js pipeline

# 发布预览
node scripts/ci-cd.js release:dry

# 分析提交
node scripts/ci-cd.js analyze

# 查看帮助
node scripts/ci-cd.js help
```

## 📈 性能优化

### 构建优化

- 并行构建多个包
- 缓存依赖和构建产物
- 增量构建支持

### 测试优化

- 并行测试执行
- 测试结果缓存
- 覆盖率报告优化

## 🔄 工作流程

### 开发流程

1. **创建功能分支**

   ```bash
   git checkout -b feature/new-feature
   ```

2. **开发代码**

   ```bash
   # 编写代码
   # 运行测试
   pnpm test
   ```

3. **提交代码**

   ```bash
   git add .
   git commit -m "feat: 添加新功能"
   ```

4. **推送分支**

   ```bash
   git push origin feature/new-feature
   ```

5. **创建 Pull Request**
   - 在 GitHub 上创建 PR
   - 等待 CI 检查通过
   - 代码审查

6. **合并到主分支**
   - 合并 PR 到 main 分支
   - 自动触发发布流程

### 发布流程

1. **自动触发**
   - 推送代码到 main 分支
   - 自动运行 CI/CD 流程

2. **质量检查**
   - 代码质量检查
   - 类型检查
   - 测试执行

3. **安全扫描**
   - 依赖安全扫描
   - 代码安全分析

4. **构建打包**
   - 项目构建
   - 文档构建
   - 产物上传

5. **自动发布**
   - 语义化版本控制
   - 生成变更日志
   - 创建 GitHub Release
   - 发布到 NPM

6. **文档部署**
   - 部署文档到 GitHub Pages
   - 更新文档站点

## 🎯 最佳实践

1. **提交规范**
   - 使用标准的提交类型
   - 写清晰的提交消息
   - 及时提交代码

2. **测试覆盖**
   - 为新功能编写测试
   - 保持高测试覆盖率
   - 定期运行测试

3. **安全优先**
   - 定期更新依赖
   - 关注安全警告
   - 及时修复漏洞

4. **文档维护**
   - 及时更新文档
   - 保持文档同步
   - 提供使用示例

## 📞 支持

如果您遇到问题或有建议，请：

1. 查看 GitHub Actions 日志
2. 检查项目文档
3. 提交 Issue 或 PR
