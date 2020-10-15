import Vue from 'vue'
import Vuex from 'vuex'

import user from '@/store/user'
import music from '@/store/music'

Vue.use(Vuex)

export default new Vuex.Store({
  strict:true,
  modules: {
    user: user,
    music: music
  }
})
