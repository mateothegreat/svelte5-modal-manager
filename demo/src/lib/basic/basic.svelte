<script lang="ts">
  import type { ModalProps } from "@mateothegreat/svelte5-modal-manager";
  import { openBasic } from "./handler";

  /**
   * This is a custom props object that will be passed through to
   * the modal instance when the modal is opened.
   */
  type CustomEscapableProps = {
    bar: string;
  };

  /**
   * This is the reference to the modal instance that is accessible
   * within this custom component.
   *
   * This is passed in automatically by the manager for
   * all modals.
   */
  let { instance, ...rest }: ModalProps<CustomEscapableProps> = $props();
  $inspect(instance, rest);
</script>

<div>
  <h1>I am a modal with id "{instance.config.id}"</h1>
  <div>If you click outside of this modal, it will close!</div>
  <div class="bg-slate-800 flex flex-col gap-3 p-2 border-2 border-slate-600 rounded-md">
    <p>Custom props passed through:</p>
    <pre class="text-green-400">{JSON.stringify(rest, null, 2)}</pre>
  </div>
  <div class="columns">
    <button onclick={openBasic} class="primary"> Open another modal on top of this modal! </button>
    <button onclick={() => instance.close()} class="secondary">Close</button>
  </div>
</div>
