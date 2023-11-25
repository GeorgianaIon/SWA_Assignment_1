import { createRouter, createWebHistory } from "vue-router";
import { model } from "../models/store"

const routes = [
    { 
        path: '/', 
        component: () => import("../pages/Login.vue"), 
        name: 'login' 
    },
    { 
        path: '/register', 
        component: () => import("../pages/Register.vue"), 
        name: 'register' 
    },
    { 
        path: '/menu', 
        component: () => import("../pages/GameMenu.vue"), 
        name: 'menu',
        meta: {
            requiresAuth: true
        }
    },
    { 
        path: '/board', 
        component: () => import("../pages/Board.vue"),
        name: 'board',
        meta: {
            requiresAuth: true
        }
    },
    { 
        path: '/highscore', 
        component: () => import("../pages/HighScore.vue"), 
        name: 'highscore',
        meta: {
            requiresAuth: true
        }
    },
    { 
        path: '/profile', 
        component: () => import("../pages/Profile.vue"), 
        name: 'profile',
        meta: {
            requiresAuth: true
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes, 
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) 
    {
        if (!model.token) 
        {
            next({ name: 'login' })
        } 
        else 
        {
            next() 
        }
    } 
    else 
    {
        next()
    }
})

export default router;
