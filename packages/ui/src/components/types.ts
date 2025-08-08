// Vue3 组件类型定义

// Button 组件类型
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export interface ButtonEmits {
  (e: 'click', event: MouseEvent): void;
}

// Input 组件类型
export interface InputProps {
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

export interface InputEmits {
  (e: 'update:modelValue', value: string): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'keydown', event: KeyboardEvent): void;
}
