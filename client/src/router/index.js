import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import User from '@/views/User'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/u/:user',
    name: 'User',
    component: User
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router