import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "https://sanzcortes.github.io/snt4ever",
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
