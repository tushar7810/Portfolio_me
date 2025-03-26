import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import dotenv from 'dotenv'

dotenv.config({
  path: ".env"
})
// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api" : `${process.env.BACKEND_URL}`
    }
  },
  plugins: [
    react(), 
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
