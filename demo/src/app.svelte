<script lang="ts">
  import { manager } from "@mateothegreat/svelte5-modal-manager";
  import { Github, MessageCircleQuestion, Newspaper } from "lucide-svelte";
  import { openBasic } from "./lib/basic";
  import InlineCode from "./lib/components/inline-code.svelte";
  import { openEscapeable } from "./lib/escapable";

  // openEscapeable();
  openBasic();
  if (import.meta.hot) {
    import.meta.hot.accept(() => {
      import.meta.hot!.invalidate();
    });
  }
</script>

<div class="flex flex-col gap-6">
  <div class="flex flex-col gap-5 rounded-md border-2 border-gray-800 bg-gray-800/50 m-6 p-5 text-sm text-slate-300">
    <h1 class="text-xl font-bold">Svelte 5+ Modal Manager</h1>
    <p>
      <InlineCode text="@mateothegreat/svelte5-modal-manager" class="bg-black text-blue-500" /> is a modal manager for Svelte
      5+ that allows you to manage modals like a boss.
    </p>
    <div class="flex gap-3">
      <div
        class="flex h-9 cursor-pointer items-center gap-1 rounded-sm border-2 border-slate-400 bg-violet-600 p-2 transition-all duration-500 hover:bg-blue-600">
        <Newspaper class="h-5 w-5" />
        <a
          target="_blank"
          href="https://github.com/mateothegreat/svelte5-modal-manager/blob/main/docs/readme.md"
          class="">
          Documentation
        </a>
      </div>
      <div
        class="flex h-9 cursor-pointer items-center gap-1 rounded-sm border-2 border-slate-400 bg-slate-600 p-2 transition-all duration-500 hover:bg-blue-600">
        <Github class="h-5 w-5" />
        <a target="_blank" href="https://github.com/mateothegreat/svelte5-modal-manager" class="">
          GitHub Repository
        </a>
      </div>
      <div
        class="flex h-9 gap-1 cursor-pointer items-center rounded-sm border-2 border-slate-400 bg-slate-600 p-2 transition-all duration-500 hover:bg-blue-600">
        <MessageCircleQuestion class="h-5 w-5" />
        <a target="_blank" href="https://github.com/mateothegreat/svelte5-modal-manager/issues">GitHub Issues</a>
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <h2 class="text-lg font-semibold text-slate-400">Check off the list:</h2>
      <ul class="list-disc space-y-1 pl-6 text-slate-300">
        <li>
          <span class="text-pink-500 font-bold">NO</span> crazy abstractions ✅
        </li>
        <li>
          <span class="text-pink-500 font-bold">NO</span> adding components to the dom ✅
        </li>
        <li>
          <span class="text-pink-500 font-bold">NO</span> dependencies ✅
        </li>
      </ul>
      <span class="text-green-400 font-bold">Just lean & mean modals, let's 👏 go 👏</span>
      <h2 class="text-lg font-semibold text-indigo-400">💦 Features:</h2>
      <ul class="list-disc space-y-1 pl-6 text-slate-300">
        <li>Can manage thousands of modals at once 🚀</li>
        <li>Components dynamically added and removed from the dom 🔄</li>
        <li>Pass props, get an <InlineCode text="instance" class="bg-black text-blue-500" /> reference, and more!</li>
        <li>Backdrop overlay included 🔋</li>
        <li>Keyboard shortcuts ready 🎹</li>
      </ul>
    </div>
    <div class="flex items-center">
      Get started now with
      <InlineCode text="npm install @mateothegreat/svelte5-modal-manager" class="mx-1 bg-black" />
      and check out the
      <a
        class="mx-1 cursor-pointer text-violet-400 hover:text-green-500 hover:underline"
        href="https://github.com/mateothegreat/svelte5-modal-manager/blob/main/docs/readme.md">
        getting started guide..
      </a>
    </div>
  </div>

  <div class="flex justify-center items-center gap-4 p-4 bg-black border-y-2 border-cyan-500">
    <div class="text-lg font-bold text-indigo-500">🚀 Demos:</div>
    <div class="columnar">
      <button on:click={() => openBasic()}>Open Basic Modal</button>
      <button on:click={() => openEscapeable()}>Open Esc Key Modal</button>
    </div>
  </div>
</div>

<div
  class="absolute z-[9999] bottom-0 right-10 overflow-hidden rounded-t-md border-2 border-b-0 bg-neutral-950 text-xs text-gray-400 border-indigo-500">
  <p class="flex items-center gap-1.5 bg-black/80 p-2 font-medium text-slate-400">Modal Manager State</p>
  {#if manager.instances.size === 0}
    <div class="px-3 py-2 text-center text-slate-600">No modals open 😿</div>
  {:else}
    <table class="divide-y divide-gray-900 w-full text-gray-400">
      <thead>
        <tr class="text-center tracking-wider text-slate-500">
          <th class="px-3 py-2 text-left font-medium">id</th>
          <th class="px-3 py-2 text-left font-medium">index</th>
          <th class="px-3 py-2 text-left font-medium">top</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-800 text-center font-mono">
        {#each manager.instances.entries() as [_, instance]}
          <tr>
            <td class="px-3 py-2 text-left text-indigo-400">
              {instance.config.id}
            </td>
            <td class="px-3 py-2 text-center text-indigo-400">
              {instance.index}
            </td>
            <td class="px-3 py-2 text-center text-indigo-400">
              {instance.top ? "true" : "false"}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>
