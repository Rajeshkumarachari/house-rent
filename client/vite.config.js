import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://house-rent-pi.vercel.app" || "http://localhost:3000",
        secure: false,
      },
    },
  },
  plugins: [react(), tailwindcss()],
});
