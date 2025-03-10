import { Key, manager, type ModalInstance } from "@mateothegreat/svelte5-modal-manager";

import Basic from "./basic.svelte";
import { openConfirmClose } from "./keybindings";

export const openBasic = (): ModalInstance<CustomBasicProps> => {
  return manager.open<CustomBasicProps>(
    {
      component: Basic,
      backdrop: {
        class: "custom-backdrop-class",
        attributes: {
          "data-test": "backdrop"
        }
      },
      dialog: {
        attributes: {
          "data-test": "dialog"
        }
      },
      keybindings: [
        {
          key: Key.Escape,
          fn: openConfirmClose
        }
      ]
    },
    {
      bar: "baz",
      random: Math.random().toString(36).substring(2, 15)
    }
  );
};
