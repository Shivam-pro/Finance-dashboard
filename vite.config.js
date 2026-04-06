import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
  tailwindcss: {
    config: {
      darkMode: 'class', // enables dark mode via class
      theme: {
        extend: {
          colors: {
            bg: 'var(--bg)',
            text: 'var(--text-h)',
            primary: 'var(--primary)',
          },
        },
      },
    },
  },
})
