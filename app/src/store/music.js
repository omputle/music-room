import { get, post, del } from '@/functions/api'

export default {
    namespaced: true,
    state: {
        playlists: {},
        sharedPlaylists: {},
        found: null,
        control: false
    },
    mutations: {
        setPlaylists: (state, payload) => {state.playlists = payload},
        setSharedPlaylists: (state, payload) => {state.sharedPlaylists = payload},
        found: (state, payload) => {state.found = payload},
        setControl: (state, payload) => {state.control = payload}
    },
    actions: {
        getPlaylists: ctx => {
            get('/music/getPlaylist').then(r => {ctx.commit('setPlaylists', r.data)})
            .catch(e => {console.log(e)})
        },
        getSharedPlaylists: ctx => {
            post('/music/get-licensed-playlists', {token: localStorage.getItem("jwt")})
            .then(r => {ctx.commit('setSharedPlaylists', r.data)})
            .catch(e => {console.log(e)})
        },
        searchAll: async (ctx, val) => {
            let song = get(`/music/search-track/${val}`)
            let artist = get(`/music/search-artist/${val}`)
            let album = get(`/music/search-album/${val}`)
            let r = await Promise.all([song,artist,album])
            .catch(e => {console.log(e)})
            let data = {
                'songs': r[0].data.data,
                'artists': r[1].data.data,
                'albums': r[2].data.data
            }
            ctx.commit('found', data)
        },
        createPlaylist: (ctx, val) => {
            post('/music/create-playlist', {'playlist_name':val})
            .then(() => {ctx.dispatch('getPlaylists')})
            .catch(e => {console.log(e)})
        },
        deletePlaylist: (ctx, val) => {
            del('/music/delete-playlist', {'playlist_id': val})
            .then(() => {ctx.dispatch('getPlaylists')})
            .catch(e => {console.log(e)})
        },
        delegateControl: (ctx, val) => {
            post('/music/delegate-control', {'id': val.id, 'friends': val.friends})
            .catch(e => {console.log(e)})
        },
        checkControl: (ctx, val) => {
            post('/music/delegate-match', {'uid':val.uid, 'fid':val.fid})
            .then(r => {ctx.commit('setControl', r.data.result)})
            .catch(e => {console.log(e)})
        },
        sharePlaylist: (ctx, val) => {
            post('/user/give-license', val)
            .then(() => {ctx.dispatch('getSharedPlaylists')})
            .catch(e => {console.log(e)})
        },
        // give_license(user_id) {
        //     axios({
        //         method: 'post',
        //         url: `http://localhost:5000/user/give-license`,
        //         data: {
        //             'user_id': user_id,
        //             'playlist_id': this.playlist_id,
        //             'playlist_name': this.playlist_name,
        //             'token': localStorage.getItem("jwt")
        //         },
        //         headers: {'Authorization': `Bearer ${localStorage.getItem("deez")}`}
        //     }).then((res) => {
        //         console.log(res)
        //         let update = {
        //             'type': 'license',
        //         }
        //         this.connection.send(JSON.stringify(update))
        //     }).catch((err) => {
        //         console.log(err)
        //     })
        // },
    }
}