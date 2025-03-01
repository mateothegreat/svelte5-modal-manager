import type { ModalInstance } from "./instance.svelte";

export type ModalProps<P = void> = {
  instance: ModalInstance<P>;
};
