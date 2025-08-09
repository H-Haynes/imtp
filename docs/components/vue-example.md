# Vue 组件使用示例

这个页面展示了如何在 VitePress 文档中使用 Vue 组件。

## 基础用法

### 1. 简单的计数器组件 (自动导入)

<script setup>
// 无需手动导入 ref，自动导入
const count = ref(0)

const increment = () => {
  count.value++
}

const decrement = () => {
  count.value--
}
</script>

<template>
  <div class="demo-counter">
    <h3>计数器示例</h3>
    <div class="counter-display">
      <span>当前值: {{ count }}</span>
    </div>
    <div class="counter-buttons">
      <button @click="decrement" class="btn btn-secondary">-</button>
      <button @click="increment" class="btn btn-primary">+</button>
    </div>
  </div>
</template>

<style scoped>
.demo-counter {
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin: 20px 0;
  background: #f9fafb;
  text-align: center;
}

.counter-display {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 20px 0;
  color: #374151;
}

.counter-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.btn-primary {
  background: #646cff;
  color: white;
}

.btn-primary:hover {
  background: #535bf2;
  transform: translateY(-1px);
}

.btn-secondary {
  background: #6b7280;
  color: white;
}

.btn-secondary:hover {
  background: #4b5563;
  transform: translateY(-1px);
}
</style>

### 2. 表单组件 (自动导入)

<script setup>
// 无需手动导入 ref 和 computed，自动导入
const name = ref('')
const email = ref('')
const message = ref('')

const isValid = computed(() => {
  return name.value.length > 0 && email.value.includes('@') && message.value.length > 0
})

const submitForm = () => {
  if (isValid.value) {
    alert('表单提交成功！')
    name.value = ''
    email.value = ''
    message.value = ''
  }
}
</script>

<template>
  <div class="demo-form">
    <h3>表单示例</h3>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">姓名:</label>
        <input
          id="name"
          v-model="name"
          type="text"
          placeholder="请输入姓名"
          required
        >
      </div>

      <div class="form-group">
        <label for="email">邮箱:</label>
        <input
          id="email"
          v-model="email"
          type="email"
          placeholder="请输入邮箱"
          required
        >
      </div>

      <div class="form-group">
        <label for="message">消息:</label>
        <textarea
          id="message"
          v-model="message"
          placeholder="请输入消息"
          rows="4"
          required
        ></textarea>
      </div>

      <button
        type="submit"
        :disabled="!isValid"
        class="btn btn-primary"
      >
        提交表单
      </button>
    </form>

  </div>
</template>

<style scoped>
.demo-form {
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin: 20px 0;
  background: #f9fafb;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #374151;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #646cff;
  box-shadow: 0 0 0 3px rgba(100, 108, 255, 0.1);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}
</style>

### 3. 使用组合式函数 (自动导入)

<script setup>
// 使用自定义的组合式函数，自动导入
const { count, doubleCount, increment, decrement, reset } = useCounter(10)
</script>

<template>
  <div class="demo-composable">
    <h3>组合式函数示例</h3>
    <div class="counter-info">
      <p>当前值: {{ count }}</p>
      <p>双倍值: {{ doubleCount }}</p>
    </div>
    <div class="counter-buttons">
      <button @click="decrement" class="btn btn-secondary">-</button>
      <button @click="increment" class="btn btn-primary">+</button>
      <button @click="reset" class="btn btn-warning">重置</button>
    </div>
  </div>
</template>

<style scoped>
.demo-composable {
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin: 20px 0;
  background: #f9fafb;
  text-align: center;
}

.counter-info {
  margin: 15px 0;
}

.counter-info p {
  margin: 5px 0;
  font-size: 1.1rem;
}

.counter-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.btn-warning {
  background: #f59e0b;
  color: white;
}

.btn-warning:hover {
  background: #d97706;
  transform: translateY(-1px);
}
</style>

### 4. 使用全局组件

<template>
  <div class="demo-global">
    <h3>全局组件示例</h3>
    <TestComponent />
  </div>
</template>

<style scoped>
.demo-global {
  margin: 20px 0;
}
</style>

## 代码说明

### 1. 使用 `<script setup>`

```vue
<script setup>
import { ref, computed } from 'vue';

const count = ref(0);
const increment = () => count.value++;
</script>
```

### 2. 模板语法

```vue
<template>
  <div>
    <p>计数: {{ count }}</p>
    <button @click="increment">增加</button>
  </div>
</template>
```

### 3. 样式作用域

```vue
<style scoped>
/* 这些样式只会应用到当前组件 */
.demo {
  padding: 20px;
}
</style>
```

## 注意事项

1. **导入语法**: 使用 `import { ref } from 'vue'` 而不是自动导入
2. **组件注册**: 全局组件需要在主题中注册
3. **样式隔离**: 使用 `scoped` 避免样式冲突
4. **响应式数据**: 使用 `ref()` 或 `reactive()` 创建响应式数据

## 可用的 Vue API

- `ref()` - 创建响应式引用
- `reactive()` - 创建响应式对象
- `computed()` - 创建计算属性
- `watch()` - 监听数据变化
- `onMounted()` - 组件挂载后执行
- `defineProps()` - 定义组件属性
- `defineEmits()` - 定义组件事件
