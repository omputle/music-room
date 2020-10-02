import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import User from '@/views/User'
import Search from '@/views/Search'

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
  },
  {
    path: '/search',
    component: Search
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router