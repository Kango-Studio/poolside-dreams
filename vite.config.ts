import { fileURLToPath } from "node:url";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig, loadEnv, type PluginOption } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Paths the dev server watcher should never react to. `.tanstack/tmp` in
// particular is where the TanStack Start route-tree generator writes its
// scratch files on every route-tree rebuild — without this ignore, a file
// change triggers a rebuild, the rebuild writes into `.tanstack/tmp`, the
// watcher sees that write and triggers another reload, and so on. Build
// output directories are excluded for the same reason: nothing should be
// watched that our own tooling writes to while dev is running.
const WATCH_IGNORED = [
  "**/.tanstack/tmp/**",
  "**/.output/**",
  "**/.wrangler/**",
  "**/.git/**",
  "**/node_modules/**",
];

export default defineConfig(async ({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const envDefine: Record<string, string> = {};
  for (const [key, value] of Object.entries(env)) {
    envDefine[`import.meta.env.${key}`] = JSON.stringify(value);
  }

  const plugins: PluginOption[] = [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
      server: { entry: "server" },
      importProtection: {
        behavior: "error",
        client: { files: ["**/server/**"], specifiers: ["server-only"] },
      },
    }),
  ];

  if (command === "build") {
    const { nitro } = await import("nitro/vite");
    plugins.push(
      nitro({
        preset: "cloudflare-module",
      }),
    );
  }

  plugins.push(viteReact());

  return {
    define: envDefine,
    resolve: {
      alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-dom/client",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
      ignoreOutdatedRequests: true,
    },
    server: {
      host: "::",
      port: 8080,
      watch: {
        ignored: WATCH_IGNORED,
        // Wait for a file to stop changing for 1s before firing the event.
        // Absorbs editor atomic-saves and cloud-sync-tool multi-write bursts
        // that would otherwise fire several reload cycles back to back.
        awaitWriteFinish: {
          stabilityThreshold: 1000,
          pollInterval: 100,
        },
      },
    },
    plugins,
  };
});
