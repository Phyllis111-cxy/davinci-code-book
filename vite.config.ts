import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages project site: https://<user>.github.io/davinci-code-book/
  base: command === 'build' ? '/davinci-code-book/' : '/',
  plugins: [react()],
}))
