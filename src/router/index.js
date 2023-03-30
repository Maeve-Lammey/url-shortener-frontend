import { createRouter, createWebHistory } from 'vue-router'
import Login from "../views/Login.vue"
import URLs from "../views/URLs.vue"

const routes = [
  { path: '/', component: Login },
  { path: '/URLs', component: URLs },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;