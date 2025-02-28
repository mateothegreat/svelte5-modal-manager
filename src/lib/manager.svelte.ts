import { mount, unmount, type Component } from "svelte";

import { ModalConfig } from "./config";
import { ModalInstance } from "./instance.svelte";
import Modal from "./modal.svelte";
import { ReactiveMap } from "./utilities.svelte";
export class ModalManager {
  /**
   * A dictionary of all open modals.
   */
  modals = $state(new ReactiveMap<string, ModalInstance<any, any>>());

  /**
   * Opens a new modal.
   *
   * You can pass in a ModalConfig object, or a Svelte component directly.
   *
   * If you pass in a component, it will be converted to a ModalConfig
   * automatically and will assumed the default values for the other properties.
   *
   * @param config - The configuration options for the modal.
   * @param props - Additional properties to pass to the modal component.
   */
  open<T, V>(config: ModalConfig | Component<any>, props?: T): ModalInstance<T, V> {
    config = typeof config === "function" ? new ModalConfig({ component: config }) : config;

    const instance = new ModalInstance<T>(config);

    console.log(config.id, instance.config.id);
    instance.manager = this;
    instance.overlay = mount(Modal, {
      target: document.body,
      props: {
        instance,
        ...props
      }
    });

    instance.index = this.modals.size;

    Object.values(this.modals)
      .filter((modal) => modal.top)
      .forEach((modal) => {
        modal.top = false;
      });

    instance.top = true;

    this.modals.set(instance.config.id, instance);

    return instance;
  }

  /**
   * Closes a modal, removing it from the dom and the modals dictionary.
   * @param id - The unique identifier of the modal to close.
   */
  close(id: string): void {
    if (!this.modals.has(id)) {
      console.error(`Modal with id ${id} not found`, this.modals);
      return;
    }

    unmount(this.modals.get(id)?.overlay);

    this.modals.delete(id);

    Object.values(this.modals).forEach((modal) => {
      modal.isOnTop = false;
    });

    if (this.modals.size > 0) {
      const topModal = this.modals.get(Array.from(this.modals.keys())[this.modals.size - 1]);
      if (topModal) {
        topModal.top = true;
      }
    }
  }

  /**
   * Gets the index of a modal.
   * @param id - The unique identifier of the modal.
   * @returns The index of the modal.
   */
  getIndex(id: string): number {
    if (this.modals.has(id)) {
      return this.modals.get(id).index;
    }
    throw new Error(`modal with id ${id} not found`);
  }
}

export const manager = new ModalManager();
