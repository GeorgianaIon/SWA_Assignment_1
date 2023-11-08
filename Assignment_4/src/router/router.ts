import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";

const routes = [
    { path: '/', component: Login, name: 'home' },
  ]

  const router = createRouter({
    history: createWebHistory(),
    routes, 
  })

  export default router;
