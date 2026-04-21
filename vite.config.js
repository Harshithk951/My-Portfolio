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
        // Better chunk naming for caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',

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
          // Split components into more granular chunks (>50kb threshold)
          if (id.includes('/src/components/sections/')) {
            return 'sections';
          }
          if (id.includes('/src/components/ui/')) {
            return 'ui-components';
          }
          if (id.includes('/src/lib/')) {
            return 'lib-utils';
          }
          // Vendor libraries
          if (id.includes('node_modules/')) {
            const match = /node_modules\/(.+?)\//.exec(id);
            if (match) {
              const vendor = match[1].replace('@', '');
              return `vendor-${vendor}`;
            }
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
        pure_funcs: null,      // Don't treat any functions as side-effect free
      },
      mangle: true,            // Mangle variable names for smaller output
      format: {
        comments: false,       // Remove all comments
      },
    },

    // CSS minification
    cssMinify: 'lightningcss',

    // Reporting
    reportCompressed: true,  // Show gzip sizes in build output
  },

  // Performance hints
  server: {
    strictPort: false,
    preTransformRequests: true,
  },

  // Optimization hints
  esbuild: {
    // Remove console in production (alternative to terser)
    drop: ['console', 'debugger'],
  },
})