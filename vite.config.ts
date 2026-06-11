import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

const isReplit = !!process.env.PORT;
const port = isReplit ? Number(process.env.PORT) : 4173;
const basePath = process.env.BASE_PATH ?? "./";

export default defineConfig({
  base: basePath,
  plugins: [
    TanStackRouterVite({
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.gen.ts",
    }),
    react(),
    tailwindcss(),
    ...(isReplit ? [runtimeErrorOverlay()] : []),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    port: isReplit ? port : undefined,
    strictPort: isReplit,
    host: "0.0.0.0",
    allowedHosts: true,
  },
  preview: {
    port: isReplit ? port : undefined,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
