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
  plugins: [
    react(), 
    tailwindcss()
  ],
  define:{
    'process.env.BACKEND_URL': JSON.stringify(process.env.BACKEND_URL),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
