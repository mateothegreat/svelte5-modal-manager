/**
 * @file
 *
 * This module defines the props object your modal component receives at runtime.
 *
 * When you call `manager.open()`, the manager mounts your component with two
 * layers of props: the `ModalInstance` (always injected as `instance`) and
 * whatever custom payload you passed in `ModalConfig.props`. Those custom
 * fields are spread onto the component, so you can destructure them from
 * `$props()` instead of reaching through `instance.props`.
 *
 * ## Core Concepts
 *
 * 1. **Injected instance:** Every modal component receives `instance`, which is
 * how you close, focus, and inspect the modal from inside the component.
 * 2. **Custom payload:** `ModalProps<P>` intersects `P` onto that injected
 * shape, so `ModalProps<{ title: string }>` exposes both `instance` and
 * `title`.
 * 3. **Reserved `instance` key:** If `P` also declares `instance`, the injected
 * `ModalInstance` wins. The manager always passes the real instance after
 * spreading your props, so a custom field named `instance` can never clobber
 * it.
 *
 * @example
 * ```ts
 * type Payload = { title: string };
 *
 * let { instance, title }: ModalProps<Payload> = $props();
 *
 * title;            // string, from ModalConfig.props
 * instance.close(); // injected ModalInstance
 * ```
 *
 * @example
 * ```ts
 * // No custom payload: only the injected instance is available.
 * let { instance }: ModalProps = $props();
 * ```
 *
 * @example
 * ```ts
 * type Payload = { state: { foo: string } };
 *
 * let { instance, state }: ModalProps<Payload> = $props();
 *
 * state.foo = "bar";
 * instance.props.state.foo = "bar"; // same object, via instance
 * ```
 */

import type { ModalInstance } from "./instance.svelte";

/**
 * Props delivered to a modal component: your custom payload `P` plus the
 * injected `ModalInstance`.
 *
 * Use this as the `$props()` type in your modal component. Pass the same `P`
 * you used with `manager.open<P>()` so custom fields such as `state` or
 * `title` type-check when you destructure them.
 *
 * `dialog` and `backdrop` are optional config-shaped fields. Prefer reading
 * those from `instance.config` at runtime; they are on this type so a
 * component can accept the full config-adjacent surface without extra
 * intersections.
 *
 * @template P Custom props spread onto the component from `ModalConfig.props`.
 * Defaults to `unknown`, which collapses to only the injected fields.
 *
 * @example
 * ```ts
 * type FormProps = { name: string };
 *
 * let { instance, name }: ModalProps<FormProps> = $props();
 * ```
 *
 * @example
 * ```ts
 * let { instance }: ModalProps = $props();
 * instance.close();
 * ```
 *
 * @example
 * ```ts
 * // P's fields are required when P declares them as required.
 * type Payload = { count: number };
 * const props: ModalProps<Payload> = { instance, count: 1 };
 * ```
 *
 * @category Modal
 */
export type ModalProps<P = unknown> = Omit<P, "instance"> & {
  instance: ModalInstance<P>;
  dialog?: {
    class?: string;
    attributes?: Record<string, string>;
  };
  backdrop?:
    | boolean
    | null
    | {
        class?: string;
        attributes?: Record<string, string>;
      };
};
