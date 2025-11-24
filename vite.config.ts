import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// ou, se preferir manualmente:
// import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(), // lê os paths do tsconfig.json
  ],
  // caso queira manualmente sem vite-tsconfig-paths:
  // resolve: {
  //   alias: {
  //     '@': resolve(__dirname, 'src')
  //   }
  // }
});
