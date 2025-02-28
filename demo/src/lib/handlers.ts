import { manager, ModalInstance } from "@mateothegreat/svelte5-modal-manager";

import Confirm from "./confirm.svelte";
import Basic from "./modal-one.svelte";
import ModalTwo from "./modal-two.svelte";

export const openBasic = (): ModalInstance<ModalTwo> => {
  return manager.open({
    id: "modal-basic",
    component: Basic
  });
};

export const openEscapeable = (): ModalInstance<ModalTwo> => {
  return manager.open({
    id: "modal-two",
    component: Basic,
    keybindings: [
      {
        key: "Escape",
        handler: (instance) => {
          if (instance.top) {
            const result = instance.manager.open({
              id: `${instance.config.id}-escapable`,
              component: Confirm,
              props: {
                close: () => {
                  instance.close();
                }
              }
            });
          }
        }
      }
    ]
  });
};
