import { ref, type Ref, type UnwrapRef } from 'vue';

interface UseLocalStorageReturn<T> {
  value: Ref<UnwrapRef<T>>;
  setValue: (value: T | ((val: UnwrapRef<T>) => T)) => void;
  removeValue: () => void;
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): UseLocalStorageReturn<T> {
  // 检查是否在浏览器环境中
  const isClient = typeof window !== 'undefined';

  // 获取初始值
  const getStoredValue = (): T => {
    if (!isClient) {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        return JSON.parse(item) as T;
      }
      return initialValue;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  // 创建响应式引用
  const storedValue = ref<T>(getStoredValue());

  // 设置值的函数
  const setValue = (value: T | ((val: UnwrapRef<T>) => T)): void => {
    if (!isClient) {
      return;
    }

    try {
      // 允许值是一个函数，这样我们就有了与 useState 相同的 API
      const valueToStore =
        value instanceof Function ? value(storedValue.value) : value;
      storedValue.value = valueToStore as UnwrapRef<T>;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // 移除值的函数
  const removeValue = (): void => {
    if (!isClient) {
      return;
    }

    try {
      storedValue.value = initialValue as UnwrapRef<T>;
      window.localStorage.removeItem(key);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  // 监听存储变化
  const handleStorageChange = (e: StorageEvent): void => {
    if (e.key === key && e.newValue !== null) {
      try {
        storedValue.value = JSON.parse(e.newValue) as UnwrapRef<T>;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(
          `Error parsing localStorage value for key "${key}":`,
          error
        );
      }
    }
  };

  // 添加存储事件监听器
  if (isClient) {
    window.addEventListener('storage', handleStorageChange);
  }

  return {
    value: storedValue,
    setValue,
    removeValue,
  };
}
