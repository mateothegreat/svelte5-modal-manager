import type { Component } from "svelte";

import type { KeyBinding } from "./keybindings";

/**
 * Configuration options for a modal.
 */
export class ModalConfig<P = void> {
  /**
   * A unique identifier for the modal.
   */
  id: string;

  /**
   * Backdrop configuration.
   */
  backdrop?:
    | {
        class?: string;
        attributes?: Record<string, string>;
      }
    | boolean;

  /**
   * Dialog configuration.
   */
  dialog?: {
    class?: string;
    attributes?: Record<string, string>;
  };

  /**
   * The Svelte component to render inside the modal.
   */
  component: Component<any>;

  /**
   * Additional props to pass to the modal component.
   */
  props?: P;

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

  /**
   * Constructor for the ModalConfig class.
   *
   * @param obj - Can be a ModalConfig object, or a component directly.
   *
   * @example
   * ```ts
   * const intance = manager.open<CustomBasicProps>(
   *   {
   *     component: Basic,
   *     backdrop: {
   *       class: "custom-backdrop-class",
   *       attributes: {
   *         "data-test": "backdrop"
   *       }
   *     },
   *     dialog: {
   *       class: "custom-dialog-class",
   *       attributes: {
   *         "data-test": "dialog"
   *       }
   *     }
   *   },
   *   {
   *     bar: "baz",
   *     random: Math.random().toString(36).substring(2, 15)
   *   }
   * );
   * ```
   */
  constructor(obj: Omit<ModalConfig<P>, "id"> & { id?: string }) {
    Object.assign(this, obj);
    this.id = obj.id || Math.random().toString(36).substring(2, 15);
  }
}
