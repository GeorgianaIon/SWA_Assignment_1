import { createRouter, createWebHistory } from "vue-router";

const routes = [
    { path: '/', component: () => import("../pages/Login.vue"), name: 'login' },
    { path: '/register', component: () => import("../pages/Register.vue"), name: 'register' },
  ]

  const router = createRouter({
    history: createWebHistory(),
    routes, 
  })

  export default router;
