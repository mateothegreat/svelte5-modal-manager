<script lang="ts">
  import { onMount } from 'svelte';
  import type { ModalInstance } from '../../../../src/lib/modal-instance';
  import { modalManager } from './modal-manager';
  import ModalTwo from './modal-two.svelte';

  let { instance, name }: { instance: ModalInstance<any>; name: string } = $props();

  onMount(() => {
    console.log('modal one mounted', instance);
  });
</script>

<div style="display: flex; flex-direction: column; gap: 10px; justify-content: center; align-items: center; background: black; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 75%; height: 300px;">
  <h3>I am modal: {name}!</h3>
  <div>Click outside of this modal to close it!</div>
  <button onclick={() => modalManager.open({ component: ModalTwo }, { name: 'two' })}>Open Modal Two ontop of this modal!</button>
  <button onclick={() => instance.manager.close(instance.config.id)}>Close</button>
</div>
