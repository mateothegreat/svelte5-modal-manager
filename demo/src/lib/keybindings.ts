import { Key, KeyBinding, ModalInstance } from "@mateothegreat/svelte5-modal-manager";

import { EscapableProps } from "./escapable";

import CloseConfirmation from "./components/close-confirmation.svelte";

export const keybindings: KeyBinding[] = [
  {
    key: Key.Escape,
    fn: (instance) => {
      if (instance.top && instance.config.id === "modal-escapable") {
        instance.manager.open<EscapableProps>({
          id: `${instance.config.id}-escapable`,
          component: CloseConfirmation,
          backdrop: true,
          props: {
            ref: instance as unknown as ModalInstance<EscapableProps>,
            close: (parent: ModalInstance<EscapableProps>) => {
              parent.close();
              instance.close();
            }
          }
        });
      }
    }
  }
];

export const openConfirmClose = <T>(instance: ModalInstance<T>) => {
  console.log("openConfirmClose", instance.index, instance.top, instance.config.id);
  if (instance.top) {
    instance.manager.open<EscapableProps>({
      id: `${instance.config.id}-escapable`,
      component: CloseConfirmation,
      backdrop: true,
      props: {
        ref: instance as unknown as ModalInstance<EscapableProps>,
        close: (parent: ModalInstance<EscapableProps>) => {
          instance.close();
        }
      }
    });
  }
};
