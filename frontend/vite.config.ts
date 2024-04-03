import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import WindCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), WindCSS()],
  preview: {
    host: true,
    port: 80,
  }
})
