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
  style="
    display: flex;
    flex-direction: column;
    gap: 30px;
    justify-content: center;
    align-items: center;
    background: black;
    border-radius: 10px;
    border: 3px solid #8A09CA;
    padding: 40px;
    top: 50%; left: 50%;
  ">
  <div style="font-size: 20px; font-weight: bold;">Are you sure you want to close?</div>
  <div style="display: flex; gap: 10px; justify-content: center; align-items: center;">
    <button onclick={() => handle(false)} class="bg-zinc-500 text-white">Cancel, leave it open 💖</button>
    <div>or...</div>
    <button onclick={() => handle(true)} class="bg-green-500 text-white">Close that thing now! 🙇‍♂️</button>
  </div>
</div>
