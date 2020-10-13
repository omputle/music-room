<template>
    <div>
        <results v-if="found" :found="found" @player-music="playMusic" />
        <playlists :plays="plays" />
    </div>
</template>

<script>
import playlists from '@/components/playlists'
import results from '@/components/search_results'

import { get } from '@/functions/api'
import bus from '@/event_bus/bus'


export default {
    name: 'Music',
    components: {
        playlists,
        results
    },
    data() {
        return {
            plays: [],
            track: false,
            music: '',
            found: false
        }
    },
    methods: {
        getPlaylists() {
            get('/music/getPlaylist').then(r => {this.plays = r.data})
            .catch(e => {console.log(e)})
        }
    },
    mounted() {
        bus.$on('search-results', (data) => {
            this.found = data
        })
    },
    created() {
        this.getPlaylists()
    }
}
</script>