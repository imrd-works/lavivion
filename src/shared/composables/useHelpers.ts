export {
  useDebounceFn,
  useThrottleFn,
  refDebounced,
  refThrottled,
  useLocalStorage,
  useAsyncState,
  computedAsync,
} from "@vueuse/core";

import { ref, watch } from "vue";
import { useDebounceFn } from "@vueuse/core";

export function useDebouncedInput(initialValue = "", delay = 300) {
  const input = ref(initialValue);
  const debounced = ref(initialValue);

  const updateDebounced = useDebounceFn((value: string) => {
    debounced.value = value;
  }, delay);

  watch(input, (v) => updateDebounced(v), { immediate: true });

  return { input, debounced };
}
