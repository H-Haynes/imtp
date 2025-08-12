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
   - **单包发布支持**

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

### 🎯 单包发布指南

本项目支持灵活的单包发布，适用于 Monorepo 架构中的精确版本控制。

#### 方法一：使用 Changesets（推荐）

Changesets 是处理 Monorepo 发布的最佳实践，支持精确控制每个包的版本。

##### 1. 创建变更集

```bash
# 进入项目根目录
cd /Users/fan/Desktop/project/imtp

# 创建变更集
pnpm changeset
```

##### 2. 选择要发布的包

运行 `pnpm changeset` 后，系统会交互式提示：

```bash
🦋  Which packages would you like to include? ...
✔ @imtp/core
✔ @imtp/ui
✔ @imtp/types
✔ @imtp/data
✔ @imtp/utils
✔ @imtp/example-package
✔ @imtp/test-package

🦋  Which packages should have a major bump? ...
✔ @imtp/core

🦋  Which packages should have a minor bump? ...
✔ @imtp/ui

🦋  Which packages should have a patch bump? ...
✔ @imtp/types
```

##### 3. 输入变更描述

```bash
🦋  What is the summary for this change?
  feat: 添加新的核心功能

🦋  What is the summary for this change?
  fix: 修复 UI 组件样式问题

🦋  What is the summary for this change?
  docs: 更新类型定义文档
```

##### 4. 发布特定包

```bash
# 发布所有有变更的包
pnpm changeset publish

# 或者只发布特定包（需要先创建变更集）
pnpm changeset publish --filter @imtp/core
```

#### 方法二：直接使用 pnpm 发布

##### 1. 进入特定包目录

```bash
cd packages/core
```

##### 2. 构建包

```bash
pnpm build
```

##### 3. 发布包

```bash
pnpm publish --access public
```

#### 方法三：使用项目脚本

##### 1. 从根目录发布所有包

```bash
pnpm publish
```

##### 2. 使用语义化发布

```bash
pnpm release
```

#### 方法四：使用交互式工具

```bash
# 使用项目内置的交互式工具
pnpm interactive
# 选择发布管理 -> 单包发布
```

### 📦 单包发布最佳实践

#### 1. 准备工作

```bash
# 确保所有依赖已安装
pnpm install

# 运行测试
pnpm test

# 检查代码质量
pnpm lint
pnpm type-check
```

#### 2. 构建项目

```bash
# 构建所有包
pnpm build

# 或者只构建特定包
cd packages/core && pnpm build
```

#### 3. 版本管理策略

- **Patch (补丁版本)** - 修复 bug，向后兼容
- **Minor (次版本)** - 新功能，向后兼容
- **Major (主版本)** - 破坏性变更

#### 4. 发布检查清单

- [ ] 代码已通过所有测试
- [ ] 类型检查通过
- [ ] 代码质量检查通过
- [ ] 构建成功
- [ ] 版本号正确
- [ ] 变更日志已更新
- [ ] 文档已同步

### 🔄 自动化单包发布

#### GitHub Actions 配置

当推送包含特定提交消息时，可以触发单包发布：

```bash
# 发布特定包
git commit -m "feat(@imtp/core): 添加新功能"
git push origin main

# 发布多个包
git commit -m "feat(@imtp/core,@imtp/ui): 更新核心功能和UI组件"
git push origin main
```

#### 条件发布

在 CI/CD 流程中，可以根据文件变更自动判断需要发布的包：

```yaml
# .github/workflows/release.yml 示例
- name: Detect changed packages
  id: changed-packages
  run: |
    # 检测变更的包
    CHANGED_PACKAGES=$(node scripts/detect-changes.js)
    echo "packages=$CHANGED_PACKAGES" >> $GITHUB_OUTPUT

- name: Publish changed packages
  if: steps.changed-packages.outputs.packages != ''
  run: |
    pnpm changeset publish --filter ${{ steps.changed-packages.outputs.packages }}
```

### 📊 发布监控

#### 发布状态检查

```bash
# 检查包的发布状态
pnpm ls --depth=0

# 查看包的版本信息
npm view @imtp/core version
npm view @imtp/ui version
```

#### 发布日志

```bash
# 查看发布历史
npm view @imtp/core time
npm view @imtp/ui time
```

### 🚨 单包发布故障排除

#### 常见问题

1. **包未找到**

   ```bash
   # 检查包是否正确构建
   ls packages/core/dist/

   # 检查 package.json 配置
   cat packages/core/package.json
   ```

2. **版本冲突**

   ```bash
   # 检查当前版本
   npm view @imtp/core version

   # 更新版本号
   cd packages/core
   npm version patch
   ```

3. **权限问题**

   ```bash
   # 检查 NPM 认证
   npm whoami

   # 重新登录
   npm login
   ```

#### 调试命令

```bash
# 发布预览
pnpm changeset publish --dry-run

# 检查变更集
pnpm changeset status

# 验证包配置
node scripts/validate-package.js @imtp/core
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

#### 全量发布流程

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

#### 单包发布流程

1. **变更检测**
   - 检测特定包的代码变更
   - 确定需要发布的包列表

2. **选择性构建**
   - 只构建变更的包及其依赖
   - 优化构建时间

3. **版本管理**
   - 使用 Changesets 管理版本
   - 自动生成变更日志

4. **条件发布**
   - 只发布有变更的包
   - 保持其他包版本不变

5. **依赖更新**
   - 自动更新包间依赖关系
   - 确保版本兼容性

## 🎯 最佳实践

### 通用最佳实践

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

### 单包发布最佳实践

1. **版本管理策略**
   - 使用语义化版本控制
   - 遵循 SemVer 规范
   - 及时更新版本号

2. **变更管理**
   - 使用 Changesets 管理变更
   - 为每个变更写清晰的描述
   - 保持变更日志的完整性

3. **依赖管理**
   - 合理管理包间依赖
   - 避免循环依赖
   - 及时更新内部依赖

4. **发布策略**
   - 优先使用 Changesets 发布
   - 在发布前进行充分测试
   - 使用发布预览功能

5. **监控和回滚**
   - 监控发布状态
   - 准备回滚方案
   - 及时处理发布问题

## 📞 支持

如果您遇到问题或有建议，请：

1. 查看 GitHub Actions 日志
2. 检查项目文档
3. 提交 Issue 或 PR

### 单包发布支持

如果您在单包发布过程中遇到问题：

1. **查看发布日志**

   ```bash
   # 查看最近的发布记录
   npm view @imtp/core time

   # 查看包的详细信息
   npm view @imtp/core
   ```

2. **检查变更集状态**

   ```bash
   # 查看待发布的变更
   pnpm changeset status

   # 查看变更集内容
   cat .changeset/*.md
   ```

3. **验证包配置**

   ```bash
   # 检查包的构建产物
   ls packages/core/dist/

   # 验证 package.json 配置
   node scripts/validate-package.js @imtp/core
   ```

4. **常见问题解决**
   - 版本冲突：检查 NPM 上的最新版本
   - 权限问题：确认 NPM 认证状态
   - 构建失败：检查依赖和配置
   - 发布失败：查看错误日志和网络状态
