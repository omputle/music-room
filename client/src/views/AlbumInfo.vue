<template>
    <div>
        <router-link :to="'/artist/' + artist_id">
            <h2>{{artist}}</h2>
        </router-link>
        <img :src="cover" alt="">
        <div class="info">
            <ol >
                <div v-for="track in tracks" :key="track">
                    <li>{{track.title}}</li>
                </div>
            </ol>
        </div>
        <div>
            <iframe scrolling="yes" frameborder="0" allowTransparency="true" :src="music"></iframe>
            <!-- <audio :src="play" controls v-if="play" autoplay></audio> -->
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
            artist_id: '',
            tracks: [],
            play: '',
            music: ''
        }
    },
    methods: {
        fetch_data() {
            axios({
                method: 'get',
                url: 'http://localhost:5000/user/album-info/' + this.album_id
            }).then((results) => {
                console.log(results)
                this.artist = results.data.artist.name;
                this.artist_id = results.data.artist.id;
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
            this.music = `https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=700&height=1000&color=EF5466&layout=dark&size=medium&type=album&id=${song.id}&app_id=1" width="700" height="24`
        },
    },
    created() {
        // alert(this.album_id),
        this.fetch_data()
        this.music = `https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=700&height=1000&color=EF5466&layout=dark&size=medium&type=album&id=${this.album_id}&app_id=1" width="700" height="24`
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
iframe {
    width: 100%;
    height: 500px;
}
</style>