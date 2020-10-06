<template>
    <div>
        <div>
            <h1>{{name}}</h1>
            <img :src="cover" alt="">
        </div>
        <hr>
        <div v-for="album in albums" :key="album">
            <router-link :to="'/album/' + album.id">
                <img :src="album.cover_medium" alt="">
                <h3>{{album.title}}</h3>
            </router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            artist_id: this.$route.params.id,
            albums: [],
            name: '',
            cover: ''
        }
    },
    methods: {
        get_info() {
            let url = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/' + this.artist_id;
            axios.get(url).then((results) => {
                console.log("info")
                console.log(results)
                this.name = results.data.name
                this.cover = results.data.picture_medium
            }).catch((err) => {
                console.log("info")
                console.log(err)
            })
        },
        get_albums() {
            let url = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/' + this.artist_id + '/albums/';
            axios.get(url).then((results) => {
                console.log("results")
                console.log(results)
                this.albums = results.data.data
            }).catch((err) => {
                console.log("results")
                console.log(err)
            })
        }
    },
    created() {
        this.get_info()
        this.get_albums()
        console.log(this.artist_id)
    }
}
</script>