import { get } from '@/functions/api'

export default {
    namespaced: true,
    state: {
        profile: {},
        friends: {},
        settings: {},
        friend: {}
    },
    mutations: {
        setProfile: (state, payload) => {state.profile = payload},
        setFriends: (state, payload) => {
            state.friends = [
                {'title': 'followers', 'friends': payload.followers},
                {'title': 'following', 'friends': payload.followings}
            ]
        },
        setSettings: (state, payload) => {state.settings = payload},
        pickFriend: (state, payload) => {
            state.friend = payload
        }
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
        },
        currentFriend: (ctx, data) => {
            get(`/music/friendPlaylist/${data.id}`).then(r => {
                ctx.commit('pickFriend', {
                    'profile':data,
                    'playlists':r.data
                })
            }).catch(e => {console.log(e)})
        }
    }
}