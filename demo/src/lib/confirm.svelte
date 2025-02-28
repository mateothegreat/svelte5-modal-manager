<script lang="ts">
  import type { ModalInstance } from "@mateothegreat/svelte5-modal-manager";

  type Props = {
    instance: ModalInstance<any>;
  };

  let { instance }: Props = $props();

  console.log(instance);
  const handle = (v: boolean) => {
    if (v) {
      instance.props.close(true);
    }
    instance.close();
  };
</script>

<div
  class="flex flex-col gap-8 justify-center items-center bg-black rounded-lg border-3 border-[#8A09CA] p-10 top-1/2 left-1/2">
  <div class="text-xl font-bold">Are you sure you want to close?</div>
  <div class="flex gap-2.5 justify-center items-center">
    <button onclick={() => handle(true)} class="bg-green-500 text-white">Close that thing now! 🙇‍♂️</button>
    <div>or...</div>
    <button onclick={() => handle(false)} class="bg-zinc-500 text-white">Cancel, leave it open 💖</button>
  </div>
</div>
