import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    // Split heavy, rarely-changing vendor code into its own long-term-cacheable
    // chunks (Rolldown advancedChunks) so the three.js engine isn't re-downloaded
    // on every app change and the browser can fetch chunks in parallel.
    rollupOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'three', test: /[\\/]node_modules[\\/]three[\\/]/ },
            { name: 'r3f', test: /[\\/]node_modules[\\/]@react-three[\\/]/ },
            { name: 'react', test: /[\\/]node_modules[\\/]react(-dom)?[\\/]/ },
          ],
        },
      },
    },
    // three.js legitimately pushes the vendor chunk past 500 kB; raise the
    // warning threshold so the signal isn't lost in noise.
    chunkSizeWarningLimit: 900,
  },
})
