# UnoCSS 使用示例

IMTP 项目集成了 UnoCSS 原子化 CSS 框架，提供快速、灵活的样式开发体验。

## 基础使用

### 布局类

```html
<!-- Flexbox 布局 -->
<div class="flex items-center justify-between">
  <div>左侧内容</div>
  <div>右侧内容</div>
</div>

<!-- Grid 布局 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div>网格项目 1</div>
  <div>网格项目 2</div>
  <div>网格项目 3</div>
</div>
```

### 间距类

```html
<!-- 内边距 -->
<div class="p-4">所有方向 16px 内边距</div>
<div class="px-6 py-4">水平 24px，垂直 16px 内边距</div>

<!-- 外边距 -->
<div class="m-2">所有方向 8px 外边距</div>
<div class="mt-4 mb-2">上边距 16px，下边距 8px</div>
```

### 颜色类

```html
<!-- 背景色 -->
<div class="bg-blue-500">蓝色背景</div>
<div class="bg-gradient-to-r from-blue-500 to-purple-500">渐变背景</div>

<!-- 文字颜色 -->
<div class="text-gray-900">深灰色文字</div>
<div class="text-brand-500">品牌色文字</div>
```

## 自定义快捷方式

IMTP 项目定义了一些常用的快捷方式：

### 按钮样式

```html
<!-- 主要按钮 -->
<button class="btn-primary">主要按钮</button>

<!-- 次要按钮 -->
<button class="btn-secondary">次要按钮</button>

<!-- 轮廓按钮 -->
<button class="btn-outline">轮廓按钮</button>
```

### 卡片样式

```html
<!-- 基础卡片 -->
<div class="card">
  <h3>卡片标题</h3>
  <p>卡片内容</p>
</div>

<!-- 悬停效果卡片 -->
<div class="card-hover">
  <h3>悬停卡片</h3>
  <p>鼠标悬停时有阴影效果</p>
</div>
```

### 文本样式

```html
<!-- 标题文本 -->
<h1 class="text-title">大标题</h1>
<h2 class="text-subtitle">副标题</h2>

<!-- 渐变文本 -->
<h1 class="text-gradient">渐变文字效果</h1>

<!-- 正文文本 -->
<p class="text-body">正文内容</p>
```

## 响应式设计

```html
<!-- 响应式容器 -->
<div class="container-responsive">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <!-- 响应式网格 -->
  </div>
</div>

<!-- 响应式文本 -->
<h1 class="text-2xl md:text-4xl lg:text-6xl">响应式标题</h1>
```

## 动画效果

```html
<!-- 淡入动画 -->
<div class="animate-fade-in">淡入效果</div>

<!-- 滑入动画 -->
<div class="animate-slide-up">从下方滑入</div>

<!-- 缩放动画 -->
<div class="animate-bounce-in">缩放进入</div>
```

## 实际示例

<UnoCSSDemo />

## 配置说明

UnoCSS 配置文件位于 `docs/.vitepress/uno.config.ts`，包含：

- **预设**: UnoCSS、Attributify、Icons
- **主题**: 自定义颜色、字体
- **快捷方式**: 常用样式组合
- **规则**: 自定义 CSS 规则
- **安全列表**: 确保生产环境中的类名

## 最佳实践

1. **优先使用快捷方式**: 使用预定义的快捷方式提高开发效率
2. **响应式优先**: 使用响应式前缀确保移动端适配
3. **语义化命名**: 使用有意义的类名组合
4. **避免过度嵌套**: 保持类名的简洁性

## 更多资源

- [UnoCSS 官方文档](https://unocss.dev/)
- [预设文档](https://unocss.dev/presets/)
- [交互式演练场](https://unocss.dev/interactive/)
