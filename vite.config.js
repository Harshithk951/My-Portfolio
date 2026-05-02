import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

function getVendorChunk(id) {
  if (id.includes('node_modules/framer-motion')) return 'framer-motion';
  if (id.includes('node_modules/ogl')) return 'ogl-renderer';
  if (id.includes('node_modules/@radix-ui')) return 'radix-ui';
  if (id.includes('node_modules/lucide-react') || id.includes('node_modules/react-icons')) return 'icons';
  if (id.includes('node_modules/web-vitals')) return 'web-vitals';
  if (id.includes('node_modules/react/') && !id.includes('node_modules/react-')) return 'vendor-react';
  if (id.includes('node_modules/react-dom/')) return 'vendor-react-dom';
  
  const match = /node_modules\/(.+?)\//.exec(id);
  if (match) return `vendor-${match[1].replace('@', '')}`;
}

function getSrcChunk(id) {
  if (id.includes('/src/lib/')) return 'lib-utils';
  if (id.includes('/src/components/layout/')) return 'layout-components';
  if (id.includes('/src/components/sections/')) return 'sections';
  if (id.includes('/src/components/ui/')) return 'ui-components';
  if (id.includes('/src/components/shared/')) return 'shared-components';
  if (id.includes('/src/hooks/')) return 'hooks';
}

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
          if (id.includes('node_modules/')) {
            return getVendorChunk(id);
          }
          if (id.includes('/src/')) {
            return getSrcChunk(id);
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