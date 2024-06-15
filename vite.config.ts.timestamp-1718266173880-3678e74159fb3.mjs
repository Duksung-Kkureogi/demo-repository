// vite.config.ts
import { defineConfig } from "file:///Users/hyowon/Code/Project/demo-repository/node_modules/vite/dist/node/index.js";
import react from "file:///Users/hyowon/Code/Project/demo-repository/node_modules/@vitejs/plugin-react/dist/index.mjs";
import inject from "file:///Users/hyowon/Code/Project/demo-repository/node_modules/@rollup/plugin-inject/dist/es/index.js";
import { nodePolyfills } from "file:///Users/hyowon/Code/Project/demo-repository/node_modules/vite-plugin-node-polyfills/dist/index.js";
var vite_config_default = defineConfig({
  build: {
    rollupOptions: {
      plugins: [
        inject({
          // cbor-x checks for Buffer on the global object, and the polyfills plugin doesn't cover this case for the
          // production build (but works in development because Buffer gets injected as a banner, so it's "naturally"
          // available on the global object)
          "globalThis.Buffer": ["buffer", "Buffer"]
        })
      ]
    }
  },
  plugins: [
    react(),
    nodePolyfills({
      protocolImports: true,
      include: ["buffer"],
      globals: {
        Buffer: true,
        global: true,
        process: true
      }
    })
  ],
  // define: {
  //   "process.env": {},
  //   global: {},
  // },
  resolve: {
    alias: {
      crypto: "crypto-browserify"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvaHlvd29uL0NvZGUvUHJvamVjdC9kZW1vLXJlcG9zaXRvcnlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9oeW93b24vQ29kZS9Qcm9qZWN0L2RlbW8tcmVwb3NpdG9yeS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvaHlvd29uL0NvZGUvUHJvamVjdC9kZW1vLXJlcG9zaXRvcnkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IGluamVjdCBmcm9tIFwiQHJvbGx1cC9wbHVnaW4taW5qZWN0XCI7XG5pbXBvcnQgeyBub2RlUG9seWZpbGxzIH0gZnJvbSBcInZpdGUtcGx1Z2luLW5vZGUtcG9seWZpbGxzXCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgaW5qZWN0KHtcbiAgICAgICAgICAvLyBjYm9yLXggY2hlY2tzIGZvciBCdWZmZXIgb24gdGhlIGdsb2JhbCBvYmplY3QsIGFuZCB0aGUgcG9seWZpbGxzIHBsdWdpbiBkb2Vzbid0IGNvdmVyIHRoaXMgY2FzZSBmb3IgdGhlXG4gICAgICAgICAgLy8gcHJvZHVjdGlvbiBidWlsZCAoYnV0IHdvcmtzIGluIGRldmVsb3BtZW50IGJlY2F1c2UgQnVmZmVyIGdldHMgaW5qZWN0ZWQgYXMgYSBiYW5uZXIsIHNvIGl0J3MgXCJuYXR1cmFsbHlcIlxuICAgICAgICAgIC8vIGF2YWlsYWJsZSBvbiB0aGUgZ2xvYmFsIG9iamVjdClcbiAgICAgICAgICBcImdsb2JhbFRoaXMuQnVmZmVyXCI6IFtcImJ1ZmZlclwiLCBcIkJ1ZmZlclwiXSxcbiAgICAgICAgfSksXG4gICAgICBdLFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIG5vZGVQb2x5ZmlsbHMoe1xuICAgICAgcHJvdG9jb2xJbXBvcnRzOiB0cnVlLFxuXG4gICAgICBpbmNsdWRlOiBbXCJidWZmZXJcIl0sXG4gICAgICBnbG9iYWxzOiB7XG4gICAgICAgIEJ1ZmZlcjogdHJ1ZSxcbiAgICAgICAgZ2xvYmFsOiB0cnVlLFxuICAgICAgICBwcm9jZXNzOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgLy8gZGVmaW5lOiB7XG4gIC8vICAgXCJwcm9jZXNzLmVudlwiOiB7fSxcbiAgLy8gICBnbG9iYWw6IHt9LFxuICAvLyB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIGNyeXB0bzogXCJjcnlwdG8tYnJvd3NlcmlmeVwiLFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBZ1QsU0FBUyxvQkFBb0I7QUFDN1UsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sWUFBWTtBQUNuQixTQUFTLHFCQUFxQjtBQUc5QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsTUFDYixTQUFTO0FBQUEsUUFDUCxPQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFJTCxxQkFBcUIsQ0FBQyxVQUFVLFFBQVE7QUFBQSxRQUMxQyxDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixjQUFjO0FBQUEsTUFDWixpQkFBaUI7QUFBQSxNQUVqQixTQUFTLENBQUMsUUFBUTtBQUFBLE1BQ2xCLFNBQVM7QUFBQSxRQUNQLFFBQVE7QUFBQSxRQUNSLFFBQVE7QUFBQSxRQUNSLFNBQVM7QUFBQSxNQUNYO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFLQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsSUFDVjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
