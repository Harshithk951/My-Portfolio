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
        // Better chunk naming for caching (long-term cache busting)
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',

        manualChunks(id) {
          // Split large vendor libraries into separate chunks for better caching
          if (id.includes('node_modules/framer-motion')) {
            return 'framer-motion';
          }
          if (id.includes('node_modules/ogl')) {
            return 'ogl-renderer';
          }
          if (id.includes('node_modules/@radix-ui')) {
            return 'radix-ui';
          }
          if (id.includes('node_modules/lucide-react') || id.includes('node_modules/react-icons')) {
            return 'icons';
          }
          if (id.includes('node_modules/web-vitals')) {
            return 'web-vitals';
          }
          
          // Split React and ReactDOM
          if (id.includes('node_modules/react/') && !id.includes('node_modules/react-')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/react-dom/')) {
            return 'vendor-react-dom';
          }

          // Split shared utilities into their own chunk
          if (id.includes('/src/lib/')) {
            return 'lib-utils';
          }

          // Split layout components
          if (id.includes('/src/components/layout/')) {
            return 'layout-components';
          }

          // Split section components
          if (id.includes('/src/components/sections/')) {
            return 'sections';
          }

          // Split UI components
          if (id.includes('/src/components/ui/')) {
            return 'ui-components';
          }

          // Split shared components
          if (id.includes('/src/components/shared/')) {
            return 'shared-components';
          }

          // Split hooks
          if (id.includes('/src/hooks/')) {
            return 'hooks';
          }

          // Vendor libraries (default fallback)
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

    // Lower chunk size warning threshold to 250KB (from 400KB default)
    // Helps identify bloated chunks that need splitting
    chunkSizeWarningLimit: 250,

    // Enable minification with Terser (production-only)
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,      // Strip console.log/warn/error in prod
        drop_debugger: true,     // Strip debugger statements
        pure_funcs: null,        // Don't treat functions as side-effect free
        passes: 2,               // Multiple compression passes
      },
      mangle: true,              // Mangle variable names for smaller output
      format: {
        comments: false,         // Remove all comments
      },
    },

    // CSS minification (ultra-compressed)
    cssMinify: 'lightningcss',

    // Source maps for production debugging (deploy separately)
    sourcemap: false,

    // Reporting
    reportCompressed: true,      // Show gzip sizes in build output
  },

  // Performance hints
  server: {
    strictPort: false,
    preTransformRequests: true,
  },

  // Optimization hints
  esbuild: {
    // Remove console in production
    drop: ['console', 'debugger'],
  },
})