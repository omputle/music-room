<template>
    <div class="panel_item">
        <h5>{{playlist.title}}</h5>
        <div v-for="(track, index) in tracks" :key="index">
            <div @click="playMusic(track.id)">
                <p>{{track.title}} - {{plays[track.id]}}</p>
                
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
            play: false,
            plays: {}
        }
    },
    methods: {
        getTracklist() {
            axios({
                method: 'get',
                url: `http://localhost:5000/music/getTracks/${this.playlist.id}`,
                headers: {'Authorization': `Bearer ${localStorage.getItem("deez")}`}
            }).then(r => {
                this.tracks = r.data
                this.playables(-1)
            })
            .catch(e => {console.log(e)})
        },
        playables(track_id) {
            for (let i in this.tracks) {
                this.plays[this.tracks[i].id] = this.tracks[i].id === track_id ?
                    true : false
                //console.log(this.tracks[i].id + this.plays[this.tracks[i].id]+ '')
            }
            console.log(this.plays)
        },
        playMusic(track_id) {
            axios.get('http://localhost:5000/music/song-info/' + track_id)
            .then((results) => {
                //console.log(results)
                //this.playables(track_id)
                let muse = `https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&color=EF5466&layout=dark&size=medium&type=tracks&id=${results.data.id}&app_id=1" width="700" height="24`
                this.$emit('play-music', muse)
            }).catch((err) => {console.log(err)})
            
        },
        fetch_data() {
            axios({
                method: 'get',
                url: 'http://localhost:5000/music/song-info/' + this.song_id
            }).then((results) => {
                console.log(results)
                this.artist_name = results.data.artist.name
                this.artist_id = results.data.artist.id
                this.cover = results.data.album.cover_big
                this.song_name = results.data.title
                this.album_name = results.data.album.title
                this.preview = results.data.preview
                this.album_id = results.data.album.id
                this.music = `https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=700&height=1000&color=EF5466&layout=dark&size=medium&type=tracks&id=${results.data.id}&app_id=1" width="700" height="24`

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