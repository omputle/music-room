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
import axios from 'axios'

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
            axios({
                method: 'get',
                url: `http://localhost:5000/music/getTracks/${this.playlist.id}`,
                headers: {'Authorization': `Bearer ${localStorage.getItem("deez")}`}
            }).then(r => {this.tracks = r.data})
            .catch(e => {console.log(e)})
        },
        playMusic(track_id) {
            axios.get('http://localhost:5000/music/song-info/' + track_id)
            .then((results) => {
                let muse = `https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&color=EF5466&layout=dark&size=medium&type=tracks&id=${results.data.id}&app_id=1`
                this.$emit('play-music', muse)
            }).catch((err) => {console.log(err)})
            
        }
    },
    computed: {
    },
    created() {
        this.getTracklist()
    }
}
</script>
<style scoped>

</style>