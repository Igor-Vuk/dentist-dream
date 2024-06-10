import react from "@vitejs/plugin-react"
import glsl from "vite-plugin-glsl"
import { defineConfig } from "vite"
import { visualizer } from "rollup-plugin-visualizer"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), glsl(), visualizer()],
  root: "src/",
  publicDir: "../public/",
  base: "./",
  server: {
    host: true,
    open: true,
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    sourcemap: true,
    chunkSizeWarningLimit: 1600, // remove 500kb warning
  },
})
