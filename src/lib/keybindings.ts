import type { ModalInstance } from "./instance.svelte";

/**
 * Represents a key binding configuration with an optional modifier key
 */
export type KeyBinding<P = void> = {
  /**
   * The key to listen for (e.g., 'a', 'Enter', 'Escape', etc.)
   */
  key: Key;

  /**
   * Optional modifier keys that must be pressed along with the main key
   */
  modifiers?: Modifier | Modifier[];

  /**
   * The function to execute when the key combination is pressed
   */
  fn: KeyBindingFn<P>;
};

/**
 * The function to execute when the key combination is pressed.
 */
export type KeyBindingFn<P> = (instance: ModalInstance<P>) => void | Promise<void>;

/**
 * The keys that can be used in a key binding.
 */
export enum Key {
  Escape = "Escape",
  Enter = "Enter",
  Tab = "Tab",
  Shift = "Shift",
  Ctrl = "Ctrl",
  Alt = "Alt",
  Meta = "Meta"
}

/**
 * The meta keys that can be used in a key binding.
 */
export enum Modifier {
  Ctrl = "Ctrl",
  Alt = "Alt",
  Shift = "Shift",
  Meta = "Meta"
}
