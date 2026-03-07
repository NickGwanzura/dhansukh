import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      // Ensure that we don't externalize things that should be bundled
      external: [],
    },
  },
  resolve: {
    alias: {
      // Allow resolving packages from node_modules correctly
    },
  },
});