import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import User from '@/views/User'
import Search from '@/views/Search'
import Welcome from '@/views/Welcome'
import AlbumInfo from '@/views/AlbumInfo'
import PlaySong from '@/views/PlaySong'
import ArtistInfo from '@/views/ArtistInfo'
import Okay from '@/views/okay'
import Playlist from '@/views/Playlist'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    meta: {requiresAuth: true}
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
  },
  {
    path: '/play-song/:id',
    component: PlaySong
  },
  {
    path: '/artist/:id',
    component: ArtistInfo
  },
  {
    path: '/playlist/:id',
    component: Playlist
  },
  {
    path: '/okay',
    component: Okay
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router