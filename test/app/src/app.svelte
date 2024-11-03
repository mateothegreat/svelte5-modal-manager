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
<button
  on:click={() =>
    modalManager.open({
      id: 'modal-two',
      component: ModalTwo,
      escFn: async () => {
        // simulate some async work
        console.log('esc pressed, waiting 1 second before closing');
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    })}>
  Open Modal Two (delayed esc key closing)
</button>
