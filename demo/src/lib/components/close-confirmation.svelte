<script lang="ts">
  import type { ModalProps } from "@mateothegreat/svelte5-modal-manager";
  import { onMount } from "svelte";
  import type { EscapableProps } from "../escapable";
  import Props from "./props.svelte";

  let { instance }: ModalProps<EscapableProps> = $props();

  $effect(() => {
    $inspect(instance.index, instance.config.id);
  });
  onMount(() => {
    console.log(instance.index, instance.config.id);
  });
</script>

<div class="flex flex-col items-end gap-4">
  <Props {instance} />
  <div
    class="flex flex-col gap-8 justify-center items-center bg-black rounded-lg border-3 border-[#8A09CA] p-10 top-1/2 left-1/2">
    <div class="flex flex-col gap-7 justify-center items-center">
      <span class="text-6xl">💣</span>
      Are you sure you want to close the modal?
    </div>
    <div class="flex gap-2.5 justify-center items-center">
      <button onclick={() => instance.close()} class="bg-zinc-500 text-white">Cancel, leave it open 🙇</button>
      <div class="text-slate-500 italic">or...</div>
      <button
        onclick={() => {
          // Call the `close` function passed in from the parent modal as a prop
          // to close the parent modal:
          instance.config.props.close(instance);
          // Close this modal instance (the confirm modal):
          instance.close();
        }}
        class="bg-green-600 text-white">
        Close it now!
      </button>
    </div>
  </div>
</div>
