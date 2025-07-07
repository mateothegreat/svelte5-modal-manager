import type { ModalInstance } from "./instance.svelte";

export type ModalProps<P = void> = {
  instance: ModalInstance<P>;
  dialog?: {
    class?: string;
    attributes?: Record<string, string>;
  };
  backdrop?:
    | boolean
    | null
    | {
        class?: string;
        attributes?: Record<string, string>;
      };
};
