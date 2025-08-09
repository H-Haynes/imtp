# Button 按钮

Button 组件是一个基础的交互组件，支持多种样式和状态。

## 基础用法

基础的按钮用法。

<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div class="demo-section">
    <h3>基础按钮</h3>
    <div class="demo-row">
      <button class="btn btn-primary" @click="count++">
        点击次数: {{ count }}
      </button>
      <button class="btn btn-secondary">次要按钮</button>
      <button class="btn btn-outline">轮廓按钮</button>
    </div>
  </div>
</template>

<style scoped>
.demo-section {
  margin: 20px 0;
}

.demo-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin: 16px 0;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 36px;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-primary {
  background: #646cff;
  color: white;
}

.btn-primary:hover {
  background: #535bf2;
}

.btn-secondary {
  background: #f1f5f9;
  color: #475569;
}

.btn-secondary:hover {
  background: #e2e8f0;
}

.btn-outline {
  background: transparent;
  color: #646cff;
  border: 1px solid #646cff;
}

.btn-outline:hover {
  background: #646cff;
  color: white;
}
</style>

## 按钮尺寸

Button 组件支持三种尺寸：小、中、大。

<template>
  <div class="demo-section">
    <h3>按钮尺寸</h3>
    <div class="demo-row">
      <button class="btn btn-primary btn-sm">小按钮</button>
      <button class="btn btn-primary">中按钮</button>
      <button class="btn btn-primary btn-lg">大按钮</button>
    </div>
  </div>
</template>

<style scoped>
.btn-sm {
  padding: 6px 12px;
  font-size: 12px;
  min-height: 28px;
}

.btn-lg {
  padding: 12px 24px;
  font-size: 16px;
  min-height: 44px;
}
</style>

## 按钮状态

Button 组件支持多种状态：默认、禁用、加载中。

<template>
  <div class="demo-section">
    <h3>按钮状态</h3>
    <div class="demo-row">
      <button class="btn btn-primary">正常按钮</button>
      <button class="btn btn-primary" disabled>禁用按钮</button>
      <button class="btn btn-primary loading">
        <span class="loading-spinner"></span>
        加载中...
      </button>
    </div>
  </div>
</template>

<style scoped>
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.loading {
  position: relative;
  pointer-events: none;
}

.loading-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 8px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>

## 按钮形状

Button 组件支持不同的形状：圆角、圆形。

<template>
  <div class="demo-section">
    <h3>按钮形状</h3>
    <div class="demo-row">
      <button class="btn btn-primary">默认圆角</button>
      <button class="btn btn-primary rounded">圆角按钮</button>
      <button class="btn btn-primary circle">
        <span>+</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.rounded {
  border-radius: 20px;
}

.circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.circle span {
  font-size: 18px;
  font-weight: bold;
}
</style>

## API

### Props

| 参数     | 说明       | 类型    | 可选值                        | 默认值  |
| -------- | ---------- | ------- | ----------------------------- | ------- |
| type     | 按钮类型   | string  | primary / secondary / outline | primary |
| size     | 按钮尺寸   | string  | small / medium / large        | medium  |
| disabled | 是否禁用   | boolean | —                             | false   |
| loading  | 是否加载中 | boolean | —                             | false   |
| shape    | 按钮形状   | string  | default / rounded / circle    | default |

### Events

| 事件名 | 说明           | 回调参数            |
| ------ | -------------- | ------------------- |
| click  | 点击按钮时触发 | (event: MouseEvent) |

### Slots

| 插槽名  | 说明     |
| ------- | -------- |
| default | 按钮内容 |
| icon    | 按钮图标 |

## 代码示例

```vue
<template>
  <div>
    <!-- 基础用法 -->
    <Button @click="handleClick">点击我</Button>

    <!-- 不同类型 -->
    <Button type="primary">主要按钮</Button>
    <Button type="secondary">次要按钮</Button>
    <Button type="outline">轮廓按钮</Button>

    <!-- 不同尺寸 -->
    <Button size="small">小按钮</Button>
    <Button size="medium">中按钮</Button>
    <Button size="large">大按钮</Button>

    <!-- 不同状态 -->
    <Button disabled>禁用按钮</Button>
    <Button loading>加载中</Button>

    <!-- 不同形状 -->
    <Button shape="rounded">圆角按钮</Button>
    <Button shape="circle">圆形按钮</Button>

    <!-- 带图标 -->
    <Button>
      <template #icon>
        <Icon name="plus" />
      </template>
      添加
    </Button>
  </div>
</template>

<script setup>
import { Button } from '@imtp/ui';

const handleClick = () => {
  console.log('按钮被点击了');
};
</script>
```

## 设计原则

1. **一致性** - 按钮样式在整个应用中保持一致
2. **可访问性** - 支持键盘导航和屏幕阅读器
3. **反馈性** - 提供清晰的视觉反馈
4. **简洁性** - 避免过度装饰，保持简洁明了
