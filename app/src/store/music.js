import { get } from '@/functions/api'

export default {
    namespaced: true,
    state: {
        playlists: {},
        found: null,
    },
    mutations: {
        setPlaylists: (state, payload) => {state.playlists = payload},
        found: (state, payload) => {state.found = payload}
    },
    actions: {
        getPlaylists: ctx => {
            get('/music/getPlaylist').then(r => {ctx.commit('setPlaylists', r.data)})
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
        }
    },
    modules: {
    }
}