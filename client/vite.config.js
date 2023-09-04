import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "@heroicons/react",
        "@tanstack/react-query",
        "@tanstack/react-query-devtools",
        "axios",
        "framer-motion",
        "react-router-dom",
      ],
      output: {
        format: "esm",
      },
    },
  },
  server: {
    port: 3000,
  },
});
