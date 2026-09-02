<script lang="ts" generics="P">
  import { onDestroy, onMount, type Component } from "svelte";
  import type { ModalInstance } from "./instance.svelte";
  import { Modifier } from "./keybindings";

  interface Props {
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

  if (!instance.config.dialog?.class) {
    instance.config.dialog.class =
      "bg-background text-foreground max-h-[90vh] w-[min(100vw-2rem,28rem)] overflow-y-auto rounded-xl border p-6 shadow-lg";
  }

  if (!instance.config.dialog?.attributes) {
    instance.config.dialog.attributes = {
      role: "dialog",
      "aria-modal": "true"
    };
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

  /**
   * TypeScript cannot prove that `{...instance.props}` satisfies `ModalProps<P>`,
   * so widen the constructor only. Spread `instance.props` in the template so
   * `$state` payloads stay live instead of being copied into a derived snapshot.
   */
  const Body = instance.config.component as Component<Record<string, unknown>>;
</script>

{#if backdropConfig && instance.index === 0}
  <div
    onmousedown={handleClick}
    id={instance.config.id}
    style="
        position: fixed;
        z-index: 9999;
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
      <Body {...instance.props ?? {}} {instance} />
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
        z-index: 9999;
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
        transition: all 500ms;
        display: flex;
        justify-content: center;
        align-items: center;
      ">
    <Body {...instance.props ?? {}} {instance} />
  </div>
{/if}
