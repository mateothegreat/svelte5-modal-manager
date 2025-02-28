<script lang="ts">
  import { openBasic, openCancelable } from "./lib/handlers";
</script>

<div class="center">
  <div class="columnar">
    <button on:click={() => openBasic()}>Open Basic Modal</button>
    <button on:click={() => openCancelable()}>Open Cancelable Modal</button>
  </div>
</div>
