import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// NOTE: base must match your GitHub repo name for GitHub Pages to serve
// assets correctly, e.g. https://<username>.github.io/e-plantShopping/
export default defineConfig({
  plugins: [react()],
  base: '/e-plantShopping/',
})
