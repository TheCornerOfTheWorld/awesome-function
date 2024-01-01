import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import WindiCss from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/awesome/',
  plugins: [vue(), vueJsx(), WindiCss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
