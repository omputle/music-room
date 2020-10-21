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
                localStorage.removeItem("jwt")
                next({path:'/'})
            })
        }
    } else {
        next()
    }
})

Vue.prototype.openSocket = function(username) {
    if (username && !this.ws) {
        Vue.prototype.ws = new WebSocket(`ws://localhost:5001/${username}`)
        this.ws.onopen = () => {
            //console.log('socket connected')
        }
        this.ws.onmessage = (event) => {
            let msg = JSON.parse(event.data)
            this.playMusic(msg.id)
        }
    }
}

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
