import { get } from '@/functions/api'

export const user = {
    namespaced: true,
    state: {
        profile: {},
        friends: {},
        settings: {}
    },
    getters: {
        // newprofile: state => {
        //     var edit = state.profile
        //     edit.email = 'ksefeane@gmail'
        //     return edit 
        // }
    },
    mutations: {
        setProfile: (state, payload) => {
            state.profile = payload
        },
        setFriends: (state, payload) => {
            state.friends = [
                {'title': 'followers', 'friends': payload.followers},
                {'title': 'following', 'friends': payload.followings}
            ]
        },
        setSettings: (state, payload) => {
            state.settings = payload
        }
        //   changeEmail: (state, data) => {
        //       state.profile.email = data
        //   }
    },
    actions: {
        getProfile: ctx => {
            get('/user/me').then(res => {ctx.commit('setProfile', res.data)})
            .catch(e => {console.log(e)})
        },
        getFriends: ctx => {
            get('/user/friends').then(res => {ctx.commit('setFriends', res.data)})
            .catch(e => {console.log(e)})
        },
        getSettings: ctx => {
            get('/user/settings').then(res => {ctx.commit('setSettings', res.data)})
            .catch(e => {console.log(e)})
        }
    },
    modules: {
    }
}