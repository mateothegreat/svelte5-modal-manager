<script lang="ts">
  import { onMount } from 'svelte';
  import type { ModalInstance } from '../../../../src/lib/modal-instance';

  let { instance, name }: { instance: ModalInstance<any>; name: string } = $props();

  onMount(() => {
    console.log('modal two mounted', instance);
  });
</script>

<div style="display: flex; gap: 10px; justify-content: center; align-items: center; background: rebeccapurple; position: absolute; top: 0; left: 0; bottom: 0; right: 0; width: 100%; height: 100%;">
  <div>I am modal: {name}!</div>
  <button onclick={() => instance.manager.close(instance.config.id)}>Close</button>
</div>
