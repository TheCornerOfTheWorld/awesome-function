
import { defineConfig } from 'vite'
import myExample from 'rollup-demo/rollup-plugin-example'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [myExample()],
  build: {
    rollupOptions: {
      input: 'main.js'
    }
  }
})
