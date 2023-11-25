import { createRouter, createWebHistory } from "vue-router";

const routes = [
    { path: '/', component: () => import("../pages/Login.vue"), name: 'login' },
    // { path: '/menu', component: () => import("../pages/Menu.vue"), name: 'menu' },
    { path: '/register', component: () => import("../pages/Register.vue"), name: 'register' },
    { path: '/highscore', component: () => import("../pages/HighScore.vue"), name: 'highscore' },
    { path: '/profile', component: () => import("../pages/Profile.vue"), name: 'profile' }
  ]

  const router = createRouter({
    history: createWebHistory(),
    routes, 
  })

  export default router;
