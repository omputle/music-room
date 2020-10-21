import Vue from 'vue'
import Vuex from 'vuex'

import user from '@/store/user'
import music from '@/store/music'
import persist from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict:true,
  modules: {
    user: user,
    music: music
  },
  plugins: [persist]
})
