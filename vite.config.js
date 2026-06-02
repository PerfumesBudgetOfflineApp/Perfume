import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

// Process App — offline-friendly Vite config
// Removed @base44/vite-plugin to allow running without Base44 backend
export default defineConfig({
  logLevel: 'warn',
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    open: true,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        // Function form matches sub-paths (react-dom/client, react/jsx-runtime)
        // so the react vendor chunk is no longer empty. Other libs (charts,
        // jspdf, html2canvas, …) are left to Vite's default code-splitting so
        // they stay in their on-demand lazy chunks.
        manualChunks(id) {
          if (id.includes('node_modules/react-router')) return 'router';
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/') || id.includes('node_modules/scheduler')) return 'react';
          if (id.includes('node_modules/@radix-ui')) return 'ui';
        }
      }
    }
  }
})
