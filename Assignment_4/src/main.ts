import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './global.css';
import router from './router/router.ts';

createApp(App).use(router).mount('#app')
