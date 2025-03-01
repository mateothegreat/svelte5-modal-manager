import { manager, type ModalInstance } from "@mateothegreat/svelte5-modal-manager";

import Basic from "./basic.svelte";

export const openBasic = (): ModalInstance<CustomBasicProps> => {
  return manager.open<CustomBasicProps>(Basic, {
    bar: "baz",
    random: Math.random().toString(36).substring(2, 15)
  });
};
