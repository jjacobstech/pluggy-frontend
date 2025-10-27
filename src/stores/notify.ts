import { ref } from "vue";
import { defineStore } from "pinia";

export const useNotifyStore = defineStore("notify", () => {
  const status = ref(false);
  const message = ref("");

  const show = (notifyMessage: string) => {
    status.value = true;
    message.value = notifyMessage;
  };

  const hide = () => {
    status.value = false;
    message.value = "";
  };

  const timeout = (duration: number) => {
    setTimeout(() => {
      hide();
    }, duration);
  };

  return {
    status,
    message,
    show,
    hide,
    timeout,
  };
});
