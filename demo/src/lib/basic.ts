import { manager, type ModalInstance } from "@mateothegreat/svelte5-modal-manager";

import Basic from "./basic.svelte";

export const openBasic = (): ModalInstance<CustomBasicProps> => {
  return manager.open<CustomBasicProps>({
    component: Basic,
    backdrop: {
      class: "custom-backdrop-class",
      attributes: {
        "data-where-am-i": "backdrop",
        "data-my-component-name": "basic.svelte"
      }
    },
    dialog: {
      attributes: {
        "data-where-am-i": "dialog",
        "data-my-component-name": "basic.svelte"
      }
    },
    props: {
      bar: "baz",
      random: Math.random().toString(36).substring(2, 15)
    }
  });
};
