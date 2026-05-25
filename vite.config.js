import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/math-adventure/' : '/',
  server: {
    host: true,
    port: 5174,
  },
}))
