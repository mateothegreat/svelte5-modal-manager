<script lang="ts">
  import { modalManager } from './lib/modal-manager';
  import ModalOne from './lib/modal-one.svelte';
  import ModalTwo from './lib/modal-two.svelte';

  modalManager.open({
    id: 'modal-one',
    component: ModalOne
  });
</script>

<button on:click={() => modalManager.open({ id: 'modal-one', component: ModalOne })}>Open Modal One</button>
<button on:click={() => modalManager.open({ id: 'modal-two', component: ModalTwo })}>Open Modal Two</button>
