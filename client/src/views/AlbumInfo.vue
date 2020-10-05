<template>
    <div>
        <h2>{{artist}}</h2>
        <img :src="cover" alt="">
        <div class="info">
            <ol >
                <div v-for="track in tracks" :key="track">
                    <li @click="play_track(track)">{{track.title}}</li>
                </div>
            </ol>
        </div>
        <div>
            <audio :src="play" controls v-if="play" autoplay></audio>
            <!-- <audio controls v-if="check">
                <source :src="play">
            </audio> -->
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            album_id: this.$route.params.id,
            cover: '',
            artist: '',
            tracks: [],
            play: '',
            check: false
        }
    },
    methods: {
        fetch_data() {
            let url = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/';
            axios.get(url + this.album_id).then((results) => {
                console.log(results)
                this.artist = results.data.artist.name;
                this.cover = results.data.cover_big
                this.tracks = results.data.tracks.data
            }).catch((err) => {
                console.log(err)
            })
        },
        play_track(song) {
            this.check = false
            this.play = ''
            this.play = song.preview
            this.check = true
        },
    },
    created() {
        // alert(this.album_id),
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
.info {
    float: right;
}
audio {
    width: 100%;
}
</style>