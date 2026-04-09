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
          'radix-ui': ['@radix-ui/react-dropdown-menu', '@radix-ui/react-popover'],
          'icons': ['react-icons', 'lucide-react'],
        },
      },
    },
    // Lower chunk size warning threshold to 400KB
    chunkSizeWarningLimit: 400,
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  // Performance hints
  server: {
    strictPort: false,
    preTransformRequests: true,
  },
})