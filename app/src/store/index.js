import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict:true,
  state: {
      profile: {
          'username':'',
          'first_name': '',
          'last_name': '',
          'email': '',
          'img': ''
      }
  },
  getters: {
    // newprofile: state => {
    //     var edit = state.profile
    //     edit.email = 'ksefeane@gmail'
    //     return edit 
    // }
  },
  mutations: {
    getProfile: (state, data) => {
        state.profile = data
    }
    //   changeEmail: (state, data) => {
    //       state.profile.email = data
    //   }
  },
  actions: {
  },
  modules: {
  }
})
