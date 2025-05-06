/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    coverage: { provider: "istanbul" },
  },
  plugins: [
    TanStackRouterVite({
      autoCodeSplitting: true,
      routesDirectory: "./src/presentation/router/routes",
      generatedRouteTree:
        "./src/presentation/router/generated/routeTree.gen.ts",
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@/": "/src/",
    },
  },
});
