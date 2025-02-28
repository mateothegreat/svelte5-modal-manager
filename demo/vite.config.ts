import { svelte } from "@sveltejs/vite-plugin-svelte";

import tailwindcss from "@tailwindcss/vite";

import path from "path";

import { defineConfig } from "vite";

export default defineConfig({
  plugins: [svelte(), tailwindcss()],
  resolve: {
    alias: {
      $lib: path.resolve(__dirname, "./src/lib"),
      $routes: path.resolve(__dirname, "./src/routes"),
      "@mateothegreat/svelte5-modal-manager": path.resolve(__dirname, "../src/lib")
    }
  }
});
