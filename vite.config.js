import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Resolve path issue

export default defineConfig({
  plugins: [react()],

  // Development server configuration
  server: {
    proxy: {
      '/api': 'http://nexgeneducare.com:4000', // Proxy backend requests during development
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
      '@': path.resolve(__dirname, 'src'), // Optionally, you can resolve your `src` directory for cleaner imports
    },
  },
});
