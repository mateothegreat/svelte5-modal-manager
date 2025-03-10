<script lang="ts">
  import type { ModalProps } from "@mateothegreat/svelte5-modal-manager";
  import { openBasic } from "./basic";
  import InlineCode from "./components/inline-code.svelte";
  import Props from "./components/props.svelte";
  import { globalStyle } from "./styles";

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
</script>

<div class="flex flex-col gap-4 items-end">
  <Props {instance} />
  <div class="flex flex-col gap-3 {globalStyle}">
    <h1>I am a modal with id "{instance.config.id}"</h1>
    <div class="w-96">
      Press your <InlineCode text="Escape" /> key to test key bindings.
    </div>
    <div class="w-96">
      This will open a new modal with a confirm dialog where you can decide whether to close the parent modal or not.
    </div>
    <div class="flex gap-4 justify-end">
      <button onclick={openBasic} class="primary"> Open another modal on top of this modal! </button>
      <button onclick={() => instance.close()} class="secondary">close</button>
    </div>
  </div>
</div>
