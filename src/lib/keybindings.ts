import type { ModalInstance } from "./instance.svelte";

/**
 * Represents a key binding configuration with an optional modifier key
 */
export type KeyBinding = {
  /**
   * The key to listen for (e.g., 'a', 'Enter', 'Escape', etc.)
   */
  key: string;

  /**
   * Optional modifier keys that must be pressed along with the main key
   */
  modifiers?: {
    ctrl?: boolean;
    alt?: boolean;
    shift?: boolean;
    meta?: boolean;
  };

  /**
   * The function to execute when the key combination is pressed
   */
  handler: (instance: ModalInstance<any>) => void | Promise<void>;
};
