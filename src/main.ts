import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { setupCalendar } from 'v-calendar';
import { BootstrapVueNext } from 'bootstrap-vue-next';

import App from './App.vue';
import router from './router';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';

const app = createApp(App);

app.use(createPinia()).use(router).use(setupCalendar, {}).use(BootstrapVueNext);

app.mount('#app');
