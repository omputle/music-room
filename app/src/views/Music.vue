<template>
    <div>
        <iframe v-if="track" id="music_player" scrolling="no" frameborder="0" allowTransparency="true" :src="music">
        </iframe>
        <results v-if="found" :found="found" @player-music="playMusic" />
        <playlists :plays="plays" @player-music="playMusic" />
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
        },
        playMusic(m) {
            this.track = true
            this.music = m
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