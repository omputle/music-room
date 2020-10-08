<template>
    <div>
        <h2>{{playlist_name}}</h2>
        <img :src="cover" alt=""> <br>
        <p>{{creator}}</p>
        <div class="songs">
            <ol>
                <div v-for="song in songs" :key="song">
                    <li @click="play_track(song)">{{song.title}} - {{song.artist.name}}</li>
                </div>
            </ol>
        </div>
        <div>
            <audio :src="play" controls v-if="play" autoplay></audio>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            playlist_id: this.$route.params.id,
            songs: [],
            creator: '',
            cover: '',
            playlist_name: '',
            play: ''
        }
    },
    methods: {
        fetch_data() {
            let url = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/playlist/'
            axios.get(url + this.playlist_id).then((results) => {
                console.log(results)
                this.playlist_name = results.data.title
                this.creator = results.data.creator.name
                this.cover = results.data.picture_big
                this.songs = results.data.tracks.data
            }).catch((err) => {
                console.log(err)
            })
        },
        play_track(song) {
            this.play = song.preview
        }
    },
    created() {
        this.fetch_data()
    }
}
</script>

<style scoped>
li {
    text-align: left;
}
li:hover {
    color: brown;
}
.songs {
    float: right;
}
audio {
    width: 100%;
}
</style>