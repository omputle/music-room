import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import User from '@/views/User.vue'
import Music from '@/views/Music.vue'
import Friend from '@/views/Friend.vue'
import OtherUsers from '@/views/Users'
import EditProfile from '@/views/EditProfile.vue'

Vue.use(VueRouter)

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
    path: '/music',
    name: 'Music',
    component: Music,
    meta: {requiresAuth: true}
  },
  {
      path: '/:friend',
      name: 'Friend',
      component: Friend,
      meta: {requiresAuth: true}
  },
  {
      path: '/edit-profile/:id',
      name: 'EditProfile',
      component: EditProfile,
      meta: {requiresAuth: true}
  },
  {
      path: '/users/others',
      name: 'OtherUsers',
      component: OtherUsers,
      meta: {requiresAuth: true}
  }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router