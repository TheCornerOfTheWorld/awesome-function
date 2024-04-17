import { defineConfig } from 'vite'
import viteConsolePromotePlugin from './src/index'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [viteConsolePromotePlugin()],
  build: {
    rollupOptions: {
      input: 'test.ts'
    }
  }
})
