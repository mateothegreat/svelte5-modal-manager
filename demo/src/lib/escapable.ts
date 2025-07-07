import { type ModalInstance, manager } from "@mateothegreat/svelte5-modal-manager";
import { Key } from "@mateothegreat/svelte5-modal-manager/keybindings";

import Modal from "./escapable.svelte";

import CloseConfirmation from "./components/close-confirmation.svelte";

export type EscapableProps = {
  ref?: ModalInstance<EscapableProps>;
  /**
   * Expose some data that you can access it from within your
   * component via the `instance.config.props` $props() object.
   */
  foo?: {
    bar: string;
  };

  /**
   * The function to call when the escape key is pressed
   * and the caller should close the modal.
   */
  close?: (parent: ModalInstance<EscapableProps>) => void;
};

export const openEscapeable = (): ModalInstance<EscapableProps> => {
  const instance = manager.open<EscapableProps>({
    id: "modal-escapable",
    component: Modal,
    backdrop: false,
    keybindings: [
      {
        key: Key.Escape,
        fn: (instance) => {
          if (instance.top && instance.config.id === "modal-escapable") {
            instance.manager.open<EscapableProps>({
              id: `${instance.config.id}-escapable`,
              component: CloseConfirmation,
              backdrop: {
                class: "custom-backdrop-class",
                attributes: {
                  "data-where-am-i": "backdrop",
                  "data-my-component-name": "escapable.svelte"
                }
              },
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
    ],
    props: {
      // ref: this as unknown as ModalInstance<EscapableProps>,
      foo: {
        bar: "baz"
      }
    }
  });

  return instance;
};
