import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Resolve path issues

export default defineConfig({
  plugins: [react()],

  // Development server configuration
  server: {
    proxy: {
      '/auth': 'http://localhost:8080', // Proxy to your backend API (e.g., login)
      '/api': {
        target: 'http://localhost:4000', // Proxy to your backend server (e.g., REST API)
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Rewrite the path to match the backend
      },
    },
  },

  // Build settings
  build: {
    outDir: 'dist', // Ensure build output is in `dist/`
    chunkSizeWarningLimit: 6000, // Optional: Increase chunk size limit to avoid warnings
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'), // Resolve path issue with `path.resolve`
    },
  },

  // Resolve paths properly
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Optionally, resolve your `src` directory for cleaner imports
    },
  },
});
