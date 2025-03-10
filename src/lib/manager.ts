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
  open<P = unknown>(config: ModalConfig<P> | Component<any>, props?: P): ModalInstance<P> {
    if ("id" in config && document.getElementById(config.id)) {
      throw new Error(`modal with id (or an element with the same id) "${config.id}" already exists`);
    }

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

    this.instances.set(instance.config.id, instance as ModalInstance<void>);
    instance.index = this.instances.size;
    this.reorder();

    return instance;
  }

  /**
   * Closes a modal, removing it from the dom and the modals dictionary.
   * @param id - The unique identifier of the modal to close.
   */
  close(id: string): void {
    console.log("closing", id, this.instances.get(id)?.overlay);
    unmount(this.instances.get(id)?.overlay);

    this.instances.delete(id);

    Object.values(this.instances).forEach((modal) => {
      modal.isOnTop = false;
    });

    this.reorder();
  }

  /**
   * Focuses on a modal by setting it to be on top and
   * reordering the other modals to reflect the new order.
   */
  focus(id: string) {
    const instance = this.instances.get(id);
    if (!instance) throw new Error(`modal with id ${id} not found`);

    // First, set all modals to not be on top
    for (const modal of this.instances.values()) {
      modal.top = false;
    }

    // Set the specified modal to be on top
    instance.top = true;

    // Update indices to maintain proper stacking order
    const maxIndex = this.instances.size - 1;
    const currentIndex = instance.index;

    // Move all modals that were above this one down by 1
    for (const modal of this.instances.values()) {
      if (modal.index > currentIndex) {
        console.log("moving down", modal.config.id, modal.index, modal.index - 1);
        modal.index--;
      }
    }

    // Set the focused modal to the top position (highest index)
    instance.index = maxIndex;

    // Ensure all other modals have sequential indices
    const modals = Array.from(this.instances.values()).sort((a, b) => a.index - b.index);
    modals.forEach((modal, i) => {
      modal.index = i;
    });
  }

  /**
   * Reorders modal indices to maintain sequential order
   */
  private reorder(): void {
    const modals = Array.from(this.instances.values()).sort((a, b) => a.index - b.index);
    modals.forEach((modal, i) => {
      console.log("reordering", modal.config.id, modal.index, i);
      modal.index = i;

      // Set the last modal as top
      if (i === modals.length - 1) {
        console.log("setting last modal as top", modal.config.id, modal.index);
        modal.top = true;
      } else {
        modal.top = false;
      }
    });
  }
}

export const manager = new ModalManager();
