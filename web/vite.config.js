import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// One fixed-name module the integration registers as its custom panel; its css and chunks load relative to it under /fitbridge_static/
export default defineConfig(({ command }) => ({
  base: "/fitbridge_static/",
  publicDir: command === "serve" ? "public" : false, // demo-scores.json is for `vite dev`, not for the integration
  plugins: [svelte()],
  build: {
    outDir: "../custom_components/fitbridge/frontend",
    emptyOutDir: true,
    lib: { entry: "src/panel.js", formats: ["es"], fileName: () => "panel.js", cssFileName: "panel" },
  },
}));
