<script lang="ts">
  import { manager } from "@mateothegreat/svelte5-modal-manager";
  import { openBasic } from "./lib/basic/handler";
  import { openEscapeable } from "./lib/escapable/handler";
</script>

<div class="center">
  <div class="columnar">
    <button on:click={() => openBasic()}>Open Basic Modal</button>
    <button on:click={() => openEscapeable()}>Open Esc Key Modal</button>
  </div>
</div>

<div
  class="fixed bottom-0 right-10 overflow-hidden rounded-t-md border-2 border-b-0 bg-neutral-950 text-xs text-gray-400 border-indigo-500">
  <p class="flex items-center gap-1.5 bg-black/80 p-2 text-sm font-medium text-slate-400">Modal Manager State</p>
  {#if manager.instances.size === 0}
    <tr>
      <td class="px-3 py-2 text-left text-indigo-400">No modals open</td>
    </tr>
  {:else}
    <table class="divide-y divide-gray-900 w-full text-xs text-gray-400">
      <thead>
        <tr class="text-center tracking-wider text-slate-500">
          <th class="px-3 py-2 text-left font-medium">Modal Name</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-800 text-center font-mono">
        {#each manager.instances.entries() as [key, instance]}
          <tr>
            <td class="px-3 py-2 text-left text-indigo-400">
              {instance.config.id}
            </td>
            <td class="px-3 py-2 text-left text-indigo-400">
              <pre>{JSON.stringify(instance.props, null, 2)}</pre>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>
