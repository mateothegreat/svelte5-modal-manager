<script lang="ts">
  import { modalManager } from './lib/modal-manager';
  import ModalOne from './lib/modal-one.svelte';
  import ModalTwo from './lib/modal-two.svelte';

  modalManager.open(
    {
      id: 'modal-one',
      component: ModalOne
    },
    { name: 'one' }
  );
</script>

<button on:click={() => modalManager.open({ id: 'modal-one', component: ModalOne }, { name: 'one' })}>Open Modal One</button>
<button on:click={() => modalManager.open({ id: 'modal-two', component: ModalTwo }, { name: 'two' })}>Open Modal Two</button>
