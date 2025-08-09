# IMTP 文档站点

这是 IMTP 项目的文档站点，基于 VitePress 构建。

## 特性

- 📚 **现代化文档** - 基于 VitePress 的快速、现代化的文档站点
- 🎨 **美观设计** - 自定义主题，支持响应式设计
- 🔍 **全文搜索** - 内置搜索功能，快速找到需要的内容
- 🎯 **Vue 组件支持** - 支持在文档中使用 Vue 组件
- 📱 **移动端适配** - 完美支持移动设备访问
- 🌙 **主题切换** - 支持明暗主题切换

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
│       ├── variables.scss
│       └── custom.scss
├── public/              # 静态资源
│   ├── logo.svg
│   └── favicon.ico
├── guide/               # 指南文档
│   ├── index.md
│   └── getting-started.md
├── components/          # 组件文档
│   └── button.md
├── api/                 # API 文档
├── examples/            # 示例文档
└── index.md            # 首页
```

## 自定义主题

### 修改颜色主题

编辑 `.vitepress/styles/variables.scss` 文件：

```scss
// 主题色彩
$primary-color: #646cff;
$primary-hover: #535bf2;
$accent-color: #42b883;
```

### 修改样式

编辑 `.vitepress/styles/custom.scss` 文件来自定义样式。

## 添加新页面

1. 在相应目录下创建 `.md` 文件
2. 在 `.vitepress/config.ts` 中添加导航和侧边栏配置
3. 如果需要使用 Vue 组件，直接在 Markdown 中使用 `<script setup>` 和 `<template>`

## 使用 Vue 组件

在 Markdown 文件中可以直接使用 Vue 组件：

```vue
<script setup>
import { ref } from 'vue';

const count = ref(0);
</script>

<template>
  <button @click="count++">点击次数: {{ count }}</button>
</template>

<style scoped>
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

## 部署

### GitHub Pages

1. 构建文档：

   ```bash
   pnpm build
   ```

2. 将 `docs/.vitepress/dist` 目录部署到 GitHub Pages

### Vercel

1. 连接 GitHub 仓库到 Vercel
2. 设置构建命令：`cd docs && pnpm install && pnpm build`
3. 设置输出目录：`docs/.vitepress/dist`

### Netlify

1. 连接 GitHub 仓库到 Netlify
2. 设置构建命令：`cd docs && pnpm install && pnpm build`
3. 设置发布目录：`docs/.vitepress/dist`

## 贡献

欢迎贡献文档！请遵循以下规范：

1. 使用清晰的标题和结构
2. 提供完整的代码示例
3. 保持文档风格一致
4. 测试所有代码示例

## 许可证

本项目基于 MIT 许可证发布。
