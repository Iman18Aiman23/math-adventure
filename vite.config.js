import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/math-adventure/', // REPLACE 'your-repo-name' with your actual GitHub project name
  plugins: [react()],
})
