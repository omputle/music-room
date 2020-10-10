<template>
    <div>
        <iframe v-if="track" id="music_player" scrolling="no" frameborder="0" allowTransparency="true" :src="music">
        </iframe>
        <playlists :plays="plays" @player-music="playMusic"/>
    </div>
</template>

<script>
import playlists from '@/components/playlists'

import { get } from '@/functions/api'

export default {
    name: 'Music',
    components: {
        playlists
    },
    data() {
        return {
            plays: [],
            track: false,
            music: ''
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
    created() {
        this.getPlaylists()
    }
}
</script>