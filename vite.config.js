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
        manualChunks: {
          // Split libraries into separate chunks
          'ogl-renderer': ['ogl'],
          'framer-motion': ['framer-motion'],
          'radix-ui': ['@radix-ui/react-dropdown-menu'],
          'icons': ['react-icons', 'lucide-react'],
        },
      },
    },
    // Lower chunk size warning threshold to 250KB (from 400KB)
    chunkSizeWarningLimit: 250,
    // Enable minification
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