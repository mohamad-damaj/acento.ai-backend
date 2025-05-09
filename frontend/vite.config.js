import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    allowedHosts: [
      "3268-2607-fea8-a5dc-f900-a469-6e9e-28a4-74ab.ngrok-free.app",
      "93f0-2607-fea8-a5dc-f900-c47-813e-6eb9-1592.ngrok-free.app",
    ],
  },
});
