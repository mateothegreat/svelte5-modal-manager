<script lang="ts" generics="P">
  import type { ModalInstance } from "@mateothegreat/svelte5-modal-manager";

  let { instance }: { instance: ModalInstance<P> } = $props();
</script>

<div class="bg-black/75 max-w-[400px] text-sm rounded-lg border-4 border-pink-700 p-3 flex flex-col gap-2">
  <p class="text-sm text-indigo-500 font-bold">Modal Instance Properties</p>
  <table class="text-left h-fit w-60">
    <tbody>
      <tr>
        <td class="text-slate-500 py-1 align-top">instance.id:</td>
        <td class="p-1 align-top">{instance.config.id}</td>
      </tr>
      <tr>
        <td class="text-slate-500 py-1 align-top">instance.index:</td>
        <td class="p-1 align-top">{instance.index}</td>
      </tr>
      <tr>
        <td class="text-slate-500 py-1 align-top">instance.top:</td>
        <td class="p-1 align-top">{instance.top ? "true" : "false"}</td>
      </tr>
      <tr>
        <td class="text-slate-500 py-1 align-top">instance.props:</td>
        <td class="p-1 align-top">
          <pre class="text-xs text-slate-600 p-1">{JSON.stringify(instance.props, null, 2)}</pre>
        </td>
      </tr>
    </tbody>
  </table>
</div>
