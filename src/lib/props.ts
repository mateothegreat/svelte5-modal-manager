import type { ModalInstance } from "./instance.svelte";

export type ModalProps<P = unknown> = {
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
