<template>
    <div>
        <router-link v-if="artist_id" :to="'/artist/' + artist_id" >
            <h1>{{artist_name}}</h1>
        </router-link>
        <img :src="cover" alt="">
        <h3>{{song_name}}</h3>
        <router-link :to="'/album/' + album_id" v-if="album_id">
            <p>{{album_name}}</p>
        </router-link>
        <audio :src="preview" controls></audio>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            song_id: this.$route.params.id,
            cover: '',
            artist_name: '',
            artist_id: '',
            song_name: '',
            album_name: '',
            preview: '',
            album_id: ''
        }
    },
    methods: {
        fetch_data() {
            axios({
                method: 'get',
                url: 'http://localhost:5000/user/song-info/' + this.song_id
            }).then((results) => {
                console.log(results)
                this.artist_name = results.data.artist.name
                this.artist_id = results.data.artist.id
                this.cover = results.data.album.cover_big
                this.song_name = results.data.title
                this.album_name = results.data.album.title
                this.preview = results.data.preview
                this.album_id = results.data.album.id
            }).catch((err) => {
                console.log(err)
            })
        },
    },
    created() {
        this.fetch_data()
    }
}
</script>

<style scoped>
audio {
    width: 100%;
}
</style>