import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import blossom from '../packages/index'
console.log('🚀 ~ blossom:', blossom)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(blossom)
console.log('🚀 ~ app:', app)

app.mount('#app')
