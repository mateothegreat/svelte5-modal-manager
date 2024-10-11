<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from 'svelte';
  import type { ModalInstance } from './modal-instance';

  interface Props {
    instance: ModalInstance<any>;
  }

  let { instance = $bindable() }: Props = $props();

  interface $$Events {
    close: CustomEvent<string>;
    externalClickEvent: (e: PointerEvent) => void;
  }

  onMount(() => {
    instance.element = ref;
    // Focus the modal content div when the component is mounted
    modalContentRef?.focus();
  });

  onDestroy(() => {
    dispatch('close');
    document.removeEventListener('click', handleClick, true);
  });

  let ref: HTMLElement = $state();
  let modalContentRef: HTMLDivElement;

  const dispatch = createEventDispatcher<Record<keyof $$Events, any>>();

  const handleClick = (e: MouseEvent) => {
    const target = e.target as Node;
    if (ref && !ref.contains(target)) {
      if (instance.manager.isOnTop(instance.config.id)) {
        instance.manager.close(instance.config.id);
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    console.log(e.key);

    if (e.key === 'Escape') {
      instance.manager.close(instance.config.id);
    }
  };

  document.addEventListener('click', handleClick, true);
</script>

<div bind:this={ref} class="modal-overlay absolute bottom-0 left-0 right-0 top-0 flex h-full w-full items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-500 {instance.config.classes}">
  <div bind:this={modalContentRef} role="button" tabindex="0" onkeydown={handleKeyDown} onclick={handleClick} class="modal-content">
    <instance.config.component {instance} />
  </div>
</div>
