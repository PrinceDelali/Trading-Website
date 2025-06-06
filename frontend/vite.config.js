// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Trading-Website/', // 👈 This is important
  plugins: [react()],
})
