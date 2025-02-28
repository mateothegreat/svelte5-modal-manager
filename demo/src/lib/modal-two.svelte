<script lang="ts">
  import type { ModalInstance } from "@mateothegreat/svelte5-modal-manager";
  import { onMount } from "svelte";

  type Props = {
    instance: ModalInstance<any>;
    name: string;
  };

  let { instance, name }: Props = $props();

  onMount(() => {
    console.log("modal two mounted", instance);
  });
</script>

<div class="rows">
  <h1>I am a modal named "{instance.config.id}"</h1>
  <div>Click outside of this modal to close it!</div>
  <div class="columns justify-end">
    <button onclick={() => instance.close()} class="secondary">Close</button>
  </div>
</div>
