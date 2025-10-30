import type { Ref } from 'vue';
export const timeout = <T>(target: Ref<T>, value: T, cb?: () => void, duration: number = 2000) => {
  setTimeout(() => {
    target.value = value;
    cb?.();
  }, duration);
};
