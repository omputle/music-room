import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import jwt from 'njwt'


router.beforeEach((to, from, next) => {
    let token = localStorage.getItem("jwt")
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!token) {
            next({ path: '/' })
        } else {
            jwt.verify(token, 'edswhateds', (err) => {
                if (err) {
                    localStorage.removeItem('jwt')
                    next({ path:'/' })
                }
                next()
            })
        }
    } else {
        next()
    }
})

createApp(App).use(store).use(router).mount('#app')
