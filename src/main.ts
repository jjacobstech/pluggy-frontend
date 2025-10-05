import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { APP_NAME } from './config'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
const title: HTMLElement|null = document.getElementById('title')
title.innerHTML = APP_NAME