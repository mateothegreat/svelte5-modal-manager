<script lang="ts">
  import type { ModalProps } from "@mateothegreat/svelte5-modal-manager";
  /**
   * This is the reference to the modal instance that is accessible
   * within this custom component.
   *
   * This is passed in automatically by the manager for
   * all modals.
   */
  let { instance }: ModalProps = $props();
</script>

<div>
  <h1>I am a modal with id "{instance.config.id}"</h1>
  <div>Click outside of this modal to close it!</div>
  <div class="columns">
    <button onclick={() => instance.close()} class="secondary">close manually</button>
  </div>
</div>
