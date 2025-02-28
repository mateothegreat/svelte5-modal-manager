import type { Component } from "svelte";

import type { KeyBinding } from "./keybindings";

/**
 * Configuration options for a modal.
 */
export class ModalConfig {
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
  props?: any;

  /**
   * Whether to display a backdrop behind the modal.
   */
  backdrop?: boolean = true;

  /**
   * Whether to close the modal when clicking outside of it.
   */
  blurrable?: boolean = true;

  /**
   * Keybindings to bind to the modal.
   * Can be either a simple record of key to handler or an array of KeyBinding objects
   * for more complex key combinations.
   */
  keybindings?: KeyBinding[];

  constructor(obj: ModalConfig) {
    Object.assign(this, obj);
    this.id = obj.id || Math.random().toString(36).substring(2, 15);
  }
}
