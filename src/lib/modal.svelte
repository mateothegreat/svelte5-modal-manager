<script lang="ts" generics="T">
  import { onDestroy, onMount } from "svelte";
  import type { ModalInstance } from "./instance.svelte";
  import { Modifier } from "./keybindings";

  interface Props<P = void> {
    instance: ModalInstance<P>;
    closed?: () => void;
    externalClickEvent?: (e: PointerEvent) => void;
  }

  let { instance = $bindable(), closed = $bindable(), externalClickEvent = $bindable() }: Props = $props();

  const handleClick = (e: MouseEvent) => {
    if (instance.config.blurrable) {
      if (instance.top && e.target === e.currentTarget) {
        instance.manager.close(instance.config.id);
      }
    }
  };

  const handleKeyDown = async (e: KeyboardEvent) => {
    if (instance.config.keybindings) {
      for (const binding of instance.config.keybindings) {
        if (e.key === binding.key) {
          const modifiersMatch =
            !binding.modifiers ||
            ((!binding.modifiers.includes(Modifier.Ctrl) || e.ctrlKey) &&
              (!binding.modifiers.includes(Modifier.Alt) || e.altKey) &&
              (!binding.modifiers.includes(Modifier.Shift) || e.shiftKey) &&
              (!binding.modifiers.includes(Modifier.Meta) || e.metaKey));

          if (modifiersMatch) {
            await binding.fn(instance);
            return;
          }
        }
      }
    }
  };
  if (instance.config.keybindings && instance.config.keybindings.length > 0) {
    onMount(() => {
      document.addEventListener("keydown", handleKeyDown);
    });

    onDestroy(() => {
      document.removeEventListener("keydown", handleKeyDown);
      if (closed) {
        closed();
      }
    });
  }

  const backdrop = (
    v: typeof instance.config.backdrop
  ): { class?: string; attributes?: Record<string, string> } | null => {
    if (typeof v === "undefined") {
      return {
        class: "modal-backdrop",
        attributes: {}
      };
    }
    if (typeof v === "boolean" && v === false) {
      return null;
    }
    if (v === true) {
      return {
        class: "modal-backdrop",
        attributes: {}
      };
    }
    return v as { class?: string; attributes?: Record<string, string> };
  };

  const backdropConfig = backdrop(instance.config.backdrop);
</script>

{#if backdropConfig && instance.index === 0}
  <div
    onmousedown={handleClick}
    id={instance.config.id}
    style="
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
        background-color: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
        transition: all 500ms;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    class={backdropConfig.class}
    class:modal-backdrop={true}
    {...backdropConfig.attributes}>
    <div
      onmousedown={(e) => e.stopPropagation()}
      aria-modal="true"
      role="dialog"
      class={instance.config.dialog?.class}
      class:modal-content={true}
      {...instance.config.dialog?.attributes}>
      <instance.config.component {instance} />
    </div>
  </div>
{:else}
  <div
    id={instance.config.id}
    aria-modal="true"
    role="dialog"
    class={instance.config.dialog?.class}
    class:modal-content={true}
    {...instance.config.dialog?.attributes}
    style="
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
        transition: all 500ms;
        display: flex;
        justify-content: center;
        align-items: center;
      ">
    <instance.config.component {instance} />
  </div>
{/if}
