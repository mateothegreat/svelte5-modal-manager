<script lang="ts">
  import type { ModalInstance } from "@mateothegreat/svelte5-modal-manager";
  import { manager } from "@mateothegreat/svelte5-modal-manager";
  import { onMount } from "svelte";
  import ModalTwo from "./modal-two.svelte";

  type Props = {
    instance: ModalInstance<any>;
    name: string;
  };

  let { instance }: Props = $props();

  onMount(() => {
    console.log("modal one mounted", instance);
  });
</script>

<div>
  <h1>I am a modal with id "{instance.config.id}"</h1>
  <div>Click outside of this modal to close it!</div>
  <div class="columns">
    <button onclick={() => manager.open({ component: ModalTwo }, { name: "two" })} class="primary">
      Open Modal Two ontop of this modal!
    </button>
    <button onclick={() => instance.close()} class="secondary">Close</button>
  </div>
</div>
