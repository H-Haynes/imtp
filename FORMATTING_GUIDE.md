# 格式化配置指南

## 🎯 目标

确保保存文件时和提交代码时使用完全相同的格式化规则，避免格式化不一致的问题。

## 📋 配置说明

### 1. **VS Code 工作区设置** (`.vscode/settings.json`)

```json
{
  "editor.formatOnSave": true, // 保存时自动格式化
  "editor.defaultFormatter": "esbenp.prettier-vscode", // 使用Prettier作为默认格式化工具
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit" // 保存时自动修复ESLint问题
  }
}
```

### 2. **Prettier 配置** (`.prettierrc`)

```json
{
  "semi": true, // 使用分号
  "trailingComma": "es5", // ES5兼容的尾随逗号
  "singleQuote": true, // 使用单引号
  "printWidth": 80, // 行宽80字符
  "tabWidth": 2, // 缩进2个空格
  "useTabs": false, // 使用空格而不是制表符
  "bracketSpacing": true, // 对象字面量中的括号间距
  "arrowParens": "avoid", // 箭头函数参数省略括号
  "endOfLine": "lf" // 使用LF换行符
}
```

### 3. **ESLint 配置** (`eslint.config.js`)

- 使用ESLint v9 flat config格式
- 集成了`eslint-config-prettier`避免与Prettier冲突
- 严格的TypeScript规则
- 支持Jest全局变量

### 4. **EditorConfig** (`.editorconfig`)

确保跨编辑器的一致性：

- UTF-8编码
- LF换行符
- 2空格缩进
- 移除尾随空格

### 5. **lint-staged 配置** (`package.json`)

```json
{
  "lint-staged": {
    "*.{js,ts,tsx}": [
      "prettier --write", // 先格式化
      "eslint --fix" // 再修复ESLint问题
    ],
    "*.{json,md,yml,yaml}": [
      "prettier --write" // 只格式化
    ]
  }
}
```

## 🚀 使用方法

### 开发时

1. **安装推荐的VS Code扩展**：

   - Prettier - Code formatter
   - ESLint
   - TypeScript Importer

2. **保存文件时自动格式化**：
   - 文件会自动使用Prettier格式化
   - ESLint问题会自动修复

### 手动格式化

```bash
# 格式化所有文件
pnpm format

# 格式化并修复ESLint问题
pnpm format:fix

# 检查格式化
pnpm format:check

# 修复ESLint问题
pnpm lint:fix
```

### 提交代码时

```bash
git add .
git commit -m "feat: 新功能"
# 会自动运行 lint-staged，执行相同的格式化规则
```

## 🔧 格式化流程

### 保存文件时

1. Prettier格式化代码
2. ESLint修复可自动修复的问题

### 提交代码时

1. Prettier格式化代码
2. ESLint修复可自动修复的问题
3. 如果有无法自动修复的问题，提交会被阻止

## 📝 格式化规则

### 代码风格

- **缩进**: 2个空格
- **引号**: 单引号
- **分号**: 使用分号
- **行宽**: 80字符
- **换行符**: LF (Unix风格)

### TypeScript

- 强制函数返回类型声明
- 禁止使用any类型
- 严格的类型检查
- 一致的导入/导出格式

### 文件组织

- 移除尾随空格
- 文件末尾添加换行符
- 统一的换行符格式

## 🎯 最佳实践

1. **使用VS Code**：安装推荐的扩展，享受自动格式化
2. **定期格式化**：使用`pnpm format:fix`确保代码一致性
3. **提交前检查**：确保没有ESLint错误
4. **团队协作**：所有成员使用相同的编辑器配置

## 🔍 故障排除

### 格式化不一致

1. 确保安装了Prettier扩展
2. 检查VS Code设置是否正确
3. 运行`pnpm format:fix`手动格式化

### ESLint错误

1. 运行`pnpm lint:fix`自动修复
2. 手动修复无法自动修复的问题
3. 检查ESLint配置是否正确

### 提交被阻止

1. 查看错误信息
2. 修复ESLint问题
3. 重新提交

---

🎉 **现在保存文件和提交代码时使用完全相同的格式化规则！**
