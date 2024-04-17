
import { defineConfig } from 'vite'
import myExample from 'rollup-demo/rollup-plugin-example'
import viteConsolePromotePlugin from 'vite-console-promote-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [myExample(), viteConsolePromotePlugin()],
  build: {
    rollupOptions: {
      input: 'main.js'
    }
  }
})
