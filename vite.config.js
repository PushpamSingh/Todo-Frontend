import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
      // '/api':'http://localhost:3000'
      '/api':'https://todo-backend-3t7g.onrender.com'
    }
  },
  build: {
    outDir: 'dist', // Vercel expects this
  },
  plugins: [react(),tailwindcss()],
})
