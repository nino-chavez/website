import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => ({
  plugins: [
    sveltekit(),
    // Add bundle visualizer in analyze mode
    mode === 'analyze' && visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: './dist/stats.html'
    })
  ].filter(Boolean),
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Group vendor code
          'svelte-core': ['svelte', 'svelte/internal'],
          // Separate large dependencies if any
        }
      }
    }
  }
}));