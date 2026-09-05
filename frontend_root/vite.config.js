import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  root: './frontend',
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss()
  ],
  server: {
    proxy: {
      '/user': 'http://localhost:8000',
      '/api/products': 'http://localhost:8000',
      '/api/get': 'http://localhost:8000',
      '/images': 'http://localhost:8000',
      '/uploads': 'http://localhost:8000'
    }
  }
})
