<script lang="ts" generics="T">
  import { onDestroy, onMount } from "svelte";
  import type { ModalInstance } from "./instance.svelte";
  import { Modifier } from "./keybindings";

  interface Props<P = void> {
    instance: ModalInstance<P>;
    closed?: () => void;
    externalClickEvent?: (e: PointerEvent) => void;
  }

  let { instance = $bindable(), closed = $bindable(), externalClickEvent = $bindable(), ...rest }: Props = $props();

  const handleClick = (e: MouseEvent) => {
    if (instance.config.blurrable) {
      if (instance.top && e.target === e.currentTarget) {
        instance.manager.close(instance.config.id);
      }
    }
  };

  const handleKeyDown = async (e: KeyboardEvent) => {
    if (instance.config.keybindings && instance.top) {
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
</script>

{#if instance.config.backdrop}
  <div
    class="modal-backdrop"
    on:mousedown={handleClick}
    style="
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    transition: all 500ms;
    display: flex;
    align-items: center;
    justify-content: center;
  ">
    <div on:mousedown|stopPropagation aria-modal="true" role="dialog" class="modal-content">
      <instance.config.component {instance} {...rest} />
    </div>
  </div>
{:else}
  <div aria-modal="true" role="dialog" class="modal-content">
    <instance.config.component {instance} {...rest} />
  </div>
{/if}
