import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

console.log('Vite config is loading...') // Debug log

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    strictPort: true,
    hmr: {
      overlay: true
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true
  }
})
