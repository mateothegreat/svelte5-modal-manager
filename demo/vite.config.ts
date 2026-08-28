import { svelte } from "@sveltejs/vite-plugin-svelte";

import tailwindcss from "@tailwindcss/vite";

import path from "path";

import { fileURLToPath } from "url";

import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      "@mateothegreat/svelte5-modal-manager": path.resolve(__dirname, "../src/lib")
    }
  }
});
