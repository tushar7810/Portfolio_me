import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dotenv from 'dotenv'

// https://vite.dev/config/

dotenv.config({
  path: ".env"
})

export default defineConfig({
  define:{
    'process.env.BACKEND_URL': JSON.stringify(process.env.BACKEND_URL),
  },
  server: {
    proxy: {
      '/api': `${process.env.BACKEND_URL}`,
    },
  },
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  }
})
