import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Single base for BOTH dev and production, so the app behaves identically in
// each environment (no per-environment settings to remember/adjust).
// Production must live under /math-adventure/ for GitHub Pages (project site),
// so dev uses the same path. Vite redirects http://localhost:5173/ to it.
export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
  base: '/math-adventure/',
  server: { host: true },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-dom/client'],
          jspdf: ['jspdf'],
          html2canvas: ['html2canvas'],
          icons: ['lucide-react'],
        },
      },
    },
  },
})
=======
  base: command === 'build' ? '/math-adventure/' : '/',
  server: {
    host: true,
    port: 5174,
  },
}))
>>>>>>> 1a72af8354dcda506cb090317d5b6f8cfde4fb9f
