import { type ModalInstance, manager } from "@mateothegreat/svelte5-modal-manager";
import { Key } from "@mateothegreat/svelte5-modal-manager/keybindings";

import Confirm from "./confirm.svelte";
import Escapable from "./escapable.svelte";
import type { EscapableProps } from "./props";

export const openEscapeable = (): ModalInstance<EscapableProps> => {
  return manager.open({
    id: "modal-escapable",
    component: Escapable,
    keybindings: [
      {
        key: Key.Escape,
        fn: (instance) => {
          if (instance.top) {
            instance.manager.open<EscapableProps>({
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
