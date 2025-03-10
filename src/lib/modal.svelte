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
    console.log(instance.config.keybindings, instance.config.id, e.key);
    if (instance.config.keybindings) {
      for (const binding of instance.config.keybindings) {
        if (e.key === binding.key) {
          console.log("binding", binding);
          const modifiersMatch =
            !binding.modifiers ||
            ((!binding.modifiers.includes(Modifier.Ctrl) || e.ctrlKey) &&
              (!binding.modifiers.includes(Modifier.Alt) || e.altKey) &&
              (!binding.modifiers.includes(Modifier.Shift) || e.shiftKey) &&
              (!binding.modifiers.includes(Modifier.Meta) || e.metaKey));

          if (modifiersMatch) {
            console.log("modifiers match", binding);
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
    on:mousedown={handleClick}
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
    class={typeof instance.config.backdrop === "object" ? instance.config.backdrop.class : ""}
    class:modal-backdrop={true}
    {...typeof instance.config.backdrop === "object" ? instance.config.backdrop.attributes : {}}>
    <div
      on:mousedown|stopPropagation
      aria-modal="true"
      role="dialog"
      class={typeof instance.config.dialog === "object" ? instance.config.dialog.class : ""}
      class:modal-content={true}>
      <div class="dialog-wrapper">
        <instance.config.component {instance} />
      </div>
    </div>
  </div>
{:else}
  <div
    id={instance.config.id}
    aria-modal="true"
    role="dialog"
    class={typeof instance.config.dialog === "object" ? instance.config.dialog.class : ""}
    class:modal-content={true}
    {...typeof instance.config.dialog === "object" ? instance.config.dialog.attributes : {}}>
    <div class="dialog-wrapper">
      <instance.config.component {instance} />
    </div>
  </div>
{/if}
