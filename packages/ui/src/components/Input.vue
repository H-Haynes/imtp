<template>
  <div class="input-wrapper">
    <label v-if="label" :for="id" class="input-label">
      {{ label }}
      <span v-if="required" class="required-mark">*</span>
    </label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :class="inputClasses"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeydown"
    />
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// 定义组件属性
interface InputProps {
  modelValue?: string | number;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  id?: string;
  className?: string;
}

// 定义组件事件
interface InputEmits {
  (e: 'update:modelValue', value: string): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'keydown', event: KeyboardEvent): void;
}

// 设置默认属性
const props = withDefaults(defineProps<InputProps>(), {
  modelValue: '',
  type: 'text',
  disabled: false,
  readonly: false,
  required: false,
  size: 'md',
  className: '',
});

// 定义事件
const emit = defineEmits<InputEmits>();

// 生成唯一ID
const id = computed(
  () => props.id || `input-${Math.random().toString(36).substr(2, 9)}`
);

// 计算输入框样式类
const inputClasses = computed(() => {
  const baseClasses =
    'w-full px-3 py-2 border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500';

  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
  };

  const stateClasses = props.disabled
    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
    : props.error
      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
      : 'border-gray-300 focus:border-blue-500';

  return [baseClasses, sizeClasses[props.size], stateClasses, props.className]
    .filter(Boolean)
    .join(' ');
});

// 处理输入事件
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

// 处理焦点事件
const handleFocus = (event: FocusEvent) => {
  emit('focus', event);
};

// 处理失焦事件
const handleBlur = (event: FocusEvent) => {
  emit('blur', event);
};

// 处理键盘事件
const handleKeydown = (event: KeyboardEvent) => {
  emit('keydown', event);
};
</script>

<style scoped>
.input-wrapper {
  @apply space-y-1;
}

.input-label {
  @apply block text-sm font-medium text-gray-700;
}

.required-mark {
  @apply text-red-500 ml-1;
}

.error-message {
  @apply text-sm text-red-600;
}
</style>
