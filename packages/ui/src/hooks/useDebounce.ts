import { ref, watch, type Ref, type UnwrapRef } from 'vue';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
export function useDebounce<T>(value: T, delay: number): Ref<UnwrapRef<T>> {
  const debouncedValue = ref<T>(value);

  let timeoutId: NodeJS.Timeout | null = null;

  watch(
    () => value,
    (newValue: T) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        debouncedValue.value = newValue as UnwrapRef<T>;
      }, delay);
    },
    { immediate: true }
  );

  return debouncedValue;
}
