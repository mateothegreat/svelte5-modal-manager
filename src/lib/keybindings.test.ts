/**
 * @file
 *
 * This module verifies the built-in Escape key binding.
 *
 * These tests lock the key it listens for, that its handler calls
 * `ModalInstance.close()`, and that the same object is assignable to a
 * payload-specific `KeyBinding<P>[]` list.
 *
 * ## Core Concepts
 *
 * 1. **Key:** the binding must listen for `Key.Escape`.
 * 2. **Handler:** `fn` must call `close()` on the instance it receives.
 * 3. **Typing:** a generic handler stays assignable to `KeyBinding<P>`.
 */

import { expect, expectTypeOf, test } from "vitest";

import { ModalConfig } from "./config";
import { ModalInstance } from "./instance.svelte";
import { EscapeKeyBinding, Key, type KeyBinding } from "./keybindings";

test("listens for Escape and closes the modal instance", () => {
  class TestInstance extends ModalInstance {
    closed = false;

    close() {
      this.closed = true;
    }
  }

  const instance = new TestInstance(
    new ModalConfig({
      id: "escape-key-binding",
      component: () => ({})
    })
  );

  expect(EscapeKeyBinding.key).toBe(Key.Escape);

  EscapeKeyBinding.fn(instance);

  expect(instance.closed).toBe(true);
});

test("is assignable to a payload-specific keybinding list", () => {
  type Payload = { title: string };
  const bindings: KeyBinding<Payload>[] = [EscapeKeyBinding];

  expect(bindings).toHaveLength(1);
  expectTypeOf(bindings[0]!).toMatchTypeOf<KeyBinding<Payload>>();
});
