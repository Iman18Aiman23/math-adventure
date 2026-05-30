import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Single base for BOTH dev and production, so the app behaves identically in
// each environment (no per-environment settings to remember/adjust).
// Production must live under /math-adventure/ for GitHub Pages (project site),
// so dev uses the same path. Vite redirects http://localhost:5173/ to it.
export default defineConfig({
  plugins: [react()],
  base: '/math-adventure/',
})
