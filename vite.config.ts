import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint(), svgr()],
  resolve: {
    alias: {
      '@entities': path.resolve(__dirname, "src/entities"),
      '@app': path.resolve(__dirname, "src/app"),
      '@assets': path.resolve(__dirname, "src/shared/assets"),
      '@shared': path.resolve(__dirname, "src/shared"),
      '@features': path.resolve(__dirname, "src/features"),
      '@pages': path.resolve(__dirname, "src/pages"),
      '@widgets': path.resolve(__dirname, "src/widgets"),
    },
  },
});
