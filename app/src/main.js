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

Vue.prototype.openSocket = function() {
    let username = this.$store.state.user.profile.username
    if (username && !this.ws) {
        Vue.prototype.ws = new WebSocket(`ws://localhost:5001/${username}`)
        this.ws.onopen = () => {
            //console.log('opensocket '+username)
        }
        this.ws.onmessage = (event) => {
            try {
                let msg = JSON.parse(event.data)
                switch (msg.type) {
                    case 'delegate':
                        this.$store.dispatch('user/getFriendProfile', this.$store.state.user.cfriend)
                        break
                    case 'playsong':
                        this.$store.state.music.delegate ? this.playMusic(msg.id) : 0
                        break
                    case 'shareplaylist':
                        this.$store.dispatch('music/getSharedPlaylists')
                        break
                }
            } catch (e) {console.log(e)}
            //this.playMusic(msg.id)
        }
        this.ws.onclose = () => {
            //console.log('close socket '+username)
        }
    }
}

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
