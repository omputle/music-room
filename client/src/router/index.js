import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import User from '@/views/User'
import Search from '@/views/Search'
import Welcome from '@/views/Welcome'
import AlbumInfo from '@/views/AlbumInfo'

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
  },
  {
    path: '/welcome',
    component: Welcome
  },
  {
    path: '/album/:id',
    component: AlbumInfo
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router