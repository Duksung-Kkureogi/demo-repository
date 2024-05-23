import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import inject from "@rollup/plugin-inject";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      plugins: [
        inject({
          // cbor-x checks for Buffer on the global object, and the polyfills plugin doesn't cover this case for the
          // production build (but works in development because Buffer gets injected as a banner, so it's "naturally"
          // available on the global object)
          "globalThis.Buffer": ["buffer", "Buffer"],
        }),
      ],
    },
  },
  plugins: [
    react(),
    nodePolyfills({
      protocolImports: true,

      include: ["buffer"],
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
    }),
  ],
  // define: {
  //   "process.env": {},
  //   global: {},
  // },
  resolve: {
    alias: {
      crypto: "crypto-browserify",
    },
  },
});
