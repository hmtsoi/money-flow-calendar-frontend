import './assets/main.css'

import Vue, { createApp } from 'vue'
import { createPinia } from 'pinia'
import { setupCalendar } from 'v-calendar';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(setupCalendar, {})

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

app.mount('#app')
