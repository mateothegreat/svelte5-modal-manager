import { mount, unmount, type Component } from "svelte";

import { ModalConfig } from "./config";
import { ModalInstance } from "./instance.svelte";
import Modal from "./modal.svelte";
import type { ModalProps } from "./props";
import { ReactiveMap } from "./utilities.svelte";

export class ModalManager {
  /**
   * A dictionary of all open modals.
   */
  instances = new ReactiveMap<string, ModalInstance>();

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
  open<P = void>(config: ModalConfig<P> | Component<any>, props?: P): ModalInstance<P> {
    config = typeof config === "function" ? new ModalConfig({ component: config }) : config;

    const instance = new ModalInstance<P>(config);

    instance.manager = this;

    instance.overlay = mount<any, ModalProps<P>>(Modal, {
      target: document.body,
      props: {
        instance,
        ...props
      }
    });

    instance.index = this.instances.size;

    Object.values(this.instances)
      .filter((modal) => modal.top)
      .forEach((modal) => {
        modal.top = false;
      });

    instance.top = true;

    this.instances.set(instance.config.id, instance as ModalInstance<void>);

    return instance;
  }

  /**
   * Closes a modal, removing it from the dom and the modals dictionary.
   * @param id - The unique identifier of the modal to close.
   */
  close(id: string): void {
    unmount(this.instances.get(id)?.overlay);

    this.instances.delete(id);

    Object.values(this.instances).forEach((modal) => {
      modal.isOnTop = false;
    });

    if (this.instances.size > 0) {
      const topModal = this.instances.get(Array.from(this.instances.keys())[this.instances.size - 1]);
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
    if (this.instances.has(id)) {
      return this.instances.get(id).index;
    }
    throw new Error(`modal with id ${id} not found`);
  }
}

export const manager = new ModalManager();
