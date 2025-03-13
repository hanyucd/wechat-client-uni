import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import eslintPlugin from 'vite-plugin-eslint2';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
    host: true,
  },
  plugins: [
    uni(),
    eslintPlugin(),
  ],
});
