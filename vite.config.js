import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize chunk size and splitting
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split libraries into separate chunks (Vite 8 function format)
          if (id.includes('node_modules/ogl')) {
            return 'ogl-renderer';
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'framer-motion';
          }
          if (id.includes('node_modules/@radix-ui')) {
            return 'radix-ui';
          }
          if (id.includes('node_modules/lucide-react') || id.includes('node_modules/react-icons')) {
            return 'icons';
          }
        },
      },
    },
    // Lower chunk size warning threshold to 250KB (from 400KB)
    chunkSizeWarningLimit: 250,
    // Enable minification with Rolldown (Vite 8 now uses rolldown instead of esbuild)
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,    // Strip console.log, console.warn
        drop_debugger: true,   // Strip debugger statements
        // Important: drop_console also removes console.error and console.info
        pure_funcs: null,      // Don't treat any functions as side-effect free
      },
      mangle: true,            // Mangle variable names for smaller output
      format: {
        comments: false,       // Remove all comments
      },
    },
  },
  // Performance hints
  server: {
    strictPort: false,
    preTransformRequests: true,
  },
})