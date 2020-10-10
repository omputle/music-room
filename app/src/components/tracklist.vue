<template>
    <div class="panel_item">
        <h5>{{playlist.title}}</h5>
        <div v-for="(track, index) in tracks" :key="index">
            <div @click="playMusic(track.id)">
                <p>{{track.title}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { get } from '@/functions/api'

export default {
    name: 'Tracklist',
    props: {
        playlist: Object
    },
    data() {
        return {
            tracks: [],
        }
    },
    methods: {
        getTracklist() {
            get(`/music/getTracks/${this.playlist.id}`)
            .then(r => {this.tracks = r.data}).catch(e => {console.log(e)})
        },
        playMusic(track_id) {
            get(`/music/song-info/${track_id}`)
            .then(r => {
                let m = `https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&color=EF5466&layout=dark&size=medium&type=tracks&id=${r.data.id}&app_id=1`
                this.$emit('play-music', m)
            }).catch(e => {console.log(e)})
        }
    },
    created() {
        this.getTracklist()
    }
}
</script>