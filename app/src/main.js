import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'
import { verify } from '@/functions/jwt'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    let token = localStorage.getItem("deez")
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!token) {
            next({ path: '/' })
        } else {
            verify(token).then(() => {next()})
            .catch(() => {
                localStorage.removeItem("deez")
                next({path:'/'})
            })
        }
    } else {
        next()
    }
})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
