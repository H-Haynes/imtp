# VitePress 文档站点使用指南

## 概述

IMTP 项目使用 VitePress 构建了一个现代化的文档站点，支持 Vue 组件、响应式设计和全文搜索。

## 快速开始

### 启动开发服务器

```bash
# 从根目录启动
pnpm docs:dev

# 或进入 docs 目录后启动
cd docs && pnpm dev
```

文档站点将在 `http://localhost:5173` 启动。

### 构建生产版本

```bash
# 从根目录构建
pnpm docs:build

# 或进入 docs 目录后构建
cd docs && pnpm build

# 预览构建结果
pnpm docs:preview
```

## 项目结构

```
docs/
├── .vitepress/           # VitePress 配置
│   ├── config.ts        # 主配置文件
│   └── styles/          # 自定义样式
│       ├── variables.scss  # SCSS 变量
│       └── custom.scss     # 自定义样式
├── public/              # 静态资源
│   ├── logo.svg        # 项目 Logo
│   └── favicon.ico     # 网站图标
├── guide/               # 指南文档
│   ├── index.md        # 指南首页
│   └── getting-started.md  # 快速开始
├── components/          # 组件文档
│   └── button.md       # Button 组件文档
├── api/                 # API 文档
├── examples/            # 示例文档
└── index.md            # 文档首页
```

## 自定义主题

### 修改颜色主题

编辑 `docs/.vitepress/styles/variables.scss` 文件：

```scss
// 主题色彩
$primary-color: #646cff;
$primary-hover: #535bf2;
$accent-color: #42b883;
```

### 修改样式

编辑 `docs/.vitepress/styles/custom.scss` 文件来自定义样式。

## 添加新页面

1. 在相应目录下创建 `.md` 文件
2. 在 `docs/.vitepress/config.ts` 中添加导航和侧边栏配置
3. 如果需要使用 Vue 组件，直接在 Markdown 中使用

### 示例：添加新组件文档

1. 创建 `docs/components/input.md` 文件
2. 在 `config.ts` 的 sidebar 中添加配置：

```typescript
sidebar: {
  '/components/': [
    {
      text: 'UI 组件',
      items: [
        { text: 'Button 按钮', link: '/components/button' },
        { text: 'Input 输入框', link: '/components/input' }  // 新增
      ]
    }
  ]
}
```

## 使用 Vue 组件

在 Markdown 文件中可以直接使用 Vue 组件：

```vue
<script setup>
import { ref } from 'vue';

const count = ref(0);
</script>

<template>
  <div class="demo">
    <button @click="count++">点击次数: {{ count }}</button>
  </div>
</template>

<style scoped>
.demo {
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin: 20px 0;
}

button {
  padding: 8px 16px;
  background: #646cff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
```

## 首页设计

文档首页采用了现代化的设计风格：

- **英雄区域** - 渐变背景，突出项目名称和描述
- **特性展示** - 网格布局展示项目核心特性
- **统计数字** - 动态数字展示项目规模
- **行动号召** - 引导用户开始使用

## 响应式设计

文档站点完全支持响应式设计：

- 桌面端：完整的三栏布局
- 平板端：自适应侧边栏
- 移动端：汉堡菜单导航

## 搜索功能

VitePress 内置了全文搜索功能：

- 支持中文搜索
- 实时搜索结果
- 键盘快捷键支持

## 部署

### GitHub Pages

1. 构建文档：

   ```bash
   pnpm docs:build
   ```

2. 将 `docs/.vitepress/dist` 目录部署到 GitHub Pages

### Vercel

1. 连接 GitHub 仓库到 Vercel
2. 设置构建命令：`pnpm docs:build`
3. 设置输出目录：`docs/.vitepress/dist`

### Netlify

1. 连接 GitHub 仓库到 Netlify
2. 设置构建命令：`pnpm docs:build`
3. 设置发布目录：`docs/.vitepress/dist`

## 性能优化

- 使用 Vite 进行快速构建
- 代码分割和懒加载
- 静态资源优化
- SEO 友好

## 开发技巧

### 热重载

VitePress 支持热重载，修改文件后会自动刷新浏览器。

### 调试

使用浏览器开发者工具调试 Vue 组件和样式。

### 类型检查

TypeScript 配置已集成，支持类型检查。

## 常见问题

### Q: 如何修改导航栏？

A: 编辑 `docs/.vitepress/config.ts` 文件中的 `nav` 配置。

### Q: 如何添加新的侧边栏分组？

A: 在 `sidebar` 配置中添加新的分组对象。

### Q: 如何自定义主题颜色？

A: 修改 `docs/.vitepress/styles/variables.scss` 文件中的颜色变量。

### Q: 如何添加新的静态资源？

A: 将文件放在 `docs/public/` 目录下，然后通过 `/` 路径引用。

## 贡献指南

欢迎贡献文档！请遵循以下规范：

1. 使用清晰的标题和结构
2. 提供完整的代码示例
3. 保持文档风格一致
4. 测试所有代码示例
5. 确保移动端显示正常

## 许可证

本项目基于 MIT 许可证发布。
