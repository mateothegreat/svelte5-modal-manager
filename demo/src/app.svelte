<script lang="ts">
  import { openBasic, openEscapeable } from "./lib/handlers";
</script>

<div class="center">
  <div class="columnar">
    <button on:click={() => openBasic()}>Open Basic Modal</button>
    <button on:click={() => openEscapeable()}>Open Esc Key Modal</button>
  </div>
</div>
