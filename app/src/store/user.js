import { get, post } from '@/functions/api'

export default {
    namespaced: true,
    state: {
        profile: {},
        friends: {},
        settings: {},
        friend: {
            'profile': {'name': ''}
        },
        cfriend: '',
        localUsers: ''
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
        pickFriend: (state, payload) => {state.friend = payload},
        currentFriend: (state, payload) => {state.cfriend = payload},
        setLocals: (state, payload) => {state.localUsers = payload}
    },
    actions: {
        getProfile: ctx => {
            get('/user/me').then(res => {ctx.commit('setProfile', res.data)})
            .catch(e => {console.log(e)})
        },
        getFriends: ctx => {
            get('/user/friends').then(res => {
                ctx.commit('setFriends', res.data)
                ctx.dispatch('getUsers')
            })
            .catch(e => {console.log(e)})
        },
        getSettings: ctx => {
            get('/user/settings').then(res => {ctx.commit('setSettings', res.data)})
            .catch(e => {console.log(e)})
        },
        currentFriend: (ctx, data) => {
            ctx.commit('currentFriend', data)
            ctx.dispatch('getFriendProfile', data)
        },
        getFriendProfile: (ctx, data) => {
            get(`/music/friendPlaylist/${data.id}`).then(r => {
                ctx.commit('pickFriend', {
                    'profile':data,
                    'playlists':r.data
                })
            }).catch(e => {console.log(e)})
        },
        editProfile: (ctx, data) => {
            post('/user/edit-details', data).then(() => {ctx.dispatch('getProfile')})
            .catch(e => {console.log(e)})
        },
        getUsers: ctx => {
            get('/user/get-users').then(r => {
                let avail= []
                let f = ctx.state.friends[1].friends
                let pro = ctx.state.profile.id
                let found = 0
                r.data.forEach(local => {
                    f.forEach(friend => {
                        if (local.user_id == friend.id || local.user_id == pro) {found = 1}
                    })
                    if (found == 0) {avail.push(local)}
                    found = 0
                })
                ctx.commit('setLocals', avail)
            })
        },
        follow: (ctx, val) => {
            post('/user/follow-user', val).then(() => {
                ctx.dispatch('getFriends')
            }).catch(e => {console.log(e)})
        },
        unfollow: (ctx, val) => {
            post('/user/unfollow-user', val).then(() => {
                ctx.dispatch('getFriends')
            }).catch (e => {console.log(e)})
        }
    }
}