import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    base: '/shopping-app/',
  }

  if (command !== 'serve') {
    config.base = '/shopping-app/'
  }

  return config
})
