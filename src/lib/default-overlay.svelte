<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from 'svelte';
  import type { ModalInstance } from './modal-instance';

  interface Props {
    instance: ModalInstance<any>;
  }

  let { instance = $bindable(), ...rest }: Props = $props();

  interface $$Events {
    close: CustomEvent<string>;
    externalClickEvent: (e: PointerEvent) => void;
  }

  let ref: HTMLElement = $state();
  let modalContentRef: HTMLDivElement;

  const dispatch = createEventDispatcher<Record<keyof $$Events, any>>();

  const handleClick = (e: MouseEvent) => {
    if (instance.config.closeOnExternalClick) {
      const target = e.target as Node;
      // Check if the click target is outside the modal content
      if (modalContentRef && !modalContentRef.contains(target)) {
        if (instance.manager.isOnTop(instance.config.id)) {
          instance.manager.close(instance.config.id);
        }
      }
    }
  };

  const handleKeyDown = async (e: KeyboardEvent) => {
    if (e.key === 'Escape' && instance.config.closeOnEscape) {
      await instance.config.escFn?.();
      instance.manager.close(instance.config.id);
    }
  };

  onMount(() => {
    instance.element = ref;
    document.addEventListener('mousedown', handleClick);
  });

  onDestroy(() => {
    dispatch('close');
    document.removeEventListener('mousedown', handleClick);
  });
</script>

<div bind:this={ref} class="modal-overlay absolute bottom-0 left-0 right-0 top-0 flex h-full w-full items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-500 {instance.config.classes}">
  <div bind:this={modalContentRef} role="dialog" tabindex="0" on:keydown={handleKeyDown} class="modal-content">
    <instance.config.component {instance} {...rest} />
  </div>
</div>
