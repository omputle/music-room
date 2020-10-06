import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import jwt from 'njwt'

createApp(App).use(store).use(router).mount('#app')

router.beforeEach(async (to, from, next) => {
    let token = localStorage.getItem("jwt")
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!token) {
            next({path: '/'})
        } else {
            jwt.verify(token, 'secret', (err) => {
                if (err) {
                    next({path:'/'})
                    localStorage.removeItem('jwt')
                }
                next()
            })
        }
    } else {
        next()
    }
})