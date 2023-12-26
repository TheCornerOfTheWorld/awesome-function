import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    exclude: ['node_modules', '.git']
  },
  darkMode: 'class'
})
