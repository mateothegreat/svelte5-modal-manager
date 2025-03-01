import type { Component } from "svelte";

import type { KeyBinding } from "./keybindings";

/**
 * Configuration options for a modal.
 */
export class ModalConfig<P = void> {
  /**
   * A unique identifier for the modal.
   */
  id?: string;

  /**
   * Additional classes to apply to the modal.
   */
  classes?: string;

  /**
   * The Svelte component to render inside the modal.
   */
  component: Component<any>;

  /**
   * Additional props to pass to the modal component.
   */
  props?: P;

  /**
   * Whether to display a backdrop behind the modal.
   */
  backdrop?: boolean;

  /**
   * Whether to close the modal when clicking outside of it.
   */
  blurrable?: boolean;

  /**
   * Keybindings to bind to the modal.
   * Can be either a simple record of key to handler or an array of KeyBinding objects
   * for more complex key combinations.
   */
  keybindings?: KeyBinding[];

  constructor(obj: Omit<ModalConfig<P>, "id"> & { id?: string }) {
    Object.assign(this, obj);
    this.id = obj.id || Math.random().toString(36).substring(2, 15);
  }
}
