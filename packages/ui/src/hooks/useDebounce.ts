import { ref, watch, type Ref } from 'vue';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
export function useDebounce<T>(value: T, delay: number) {
  const debouncedValue = ref<T>(value);

  let timeoutId: NodeJS.Timeout | null = null;

  watch(
    () => value,
    (newValue: T) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        debouncedValue.value = newValue;
      }, delay);
    },
    { immediate: true }
  );

  return debouncedValue;
}
