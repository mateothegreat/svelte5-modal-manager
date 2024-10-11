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
  });

  onDestroy(() => {
    dispatch('close');
    document.removeEventListener('click', handleClick, true);
  });

  let ref: HTMLElement = $state();

  const dispatch = createEventDispatcher<Record<keyof $$Events, any>>();

  const handleClick = (e: MouseEvent) => {
    // @ts-ignore
    if (e.target.contains(ref)) {
      instance.manager.close(instance.config.id);
    }
  };

  document.addEventListener('click', handleClick, true);
</script>

<div bind:this={ref} class="modal-overlay absolute bottom-0 left-0 right-0 top-0 flex h-full w-full items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-500 {instance.config.classes}">
  <div onclick={handleClick} onblur={close} class="modal-content">
    <instance.config.component {instance} />
  </div>
</div>
