import { createRouter, createWebHistory } from "vue-router";

const routes = [
    { path: '/', component: () => import("../pages/Login.vue"), name: 'login' },
    { path: '/register', component: () => import("../pages/Register.vue"), name: 'register' },
    { path: '/highscore', component: () => import("../pages/HighScore.vue"), name: 'highscore' }
  ]

  const router = createRouter({
    history: createWebHistory(),
    routes, 
  })

  export default router;
