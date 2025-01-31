import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dotenv from "dotenv";
import tsconfigPaths from "vite-tsconfig-paths";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    open: false,
    port: Number(process.env.VITE_PORT) || 3000,
    host: true,
    proxy: {
      "/api": {
        target: process.env.VITE_API_URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  css: {
    modules: {
      generateScopedName: "[local]__[hash:base64:8]",
    },
  },
  envDir: "../../",
});
