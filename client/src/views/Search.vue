<template>
    <div>
        <h1>Search Songs</h1>
        <p>{{artist}}</p>
        <input type="search" name="" id="" v-model="artist">
        <button @click="search">Search</button>
        <div>
            <input type="search" name="" id="" v-model="album" placeholder="Search Album">
            <button @click="search_album">Search Album</button>
        </div>

        <div v-for="file in info" :key="file">
            <div>
                <router-link :to="'/album/' + file.album.id">
                <img :src="file.album.cover" alt="">
                <p>{{file.title}}</p>
                <p>{{file.artist.name}}</p>
                <small>Album: {{file.album.title}}</small>
                </router-link>
            </div>
            <hr>
        </div>

        <div v-for="info in albums_found" :key="info">
            <router-link :to="'/album/' + info.album.id">
                <img :src="info.album.cover_medium" alt="">
                <p>{{info.title}}</p>
                <small>{{info.artist.name}}</small>
            </router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            artist: '',
            album: '',
            albums_found: {},
            info: []
        }
    },
    methods: {
        search() {
            let url = 'https://cors-anywhere.herokuapp.com/http://api.deezer.com/search?q=' + this.artist
            // (https://stackoverflow.com/questions/52985844/failed-call-to-deezer-api-with-react-and-axios)

            // const headers = {
            //     "Access-Control-Allow-Origin": "*"
            // }
            axios.get(url).then((res) => {
                console.log(res.data.data)
                this.info = res.data.data
            }).catch((err) => {
                console.log(err)
            })
        },
        search_album() {
            let url = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=album:"'+ this.album +'"'
            axios.get(url).then((res) => {
                console.log(res)
                this.albums_found = res.data.data
            }).catch((err) => {
                console.log(err)
            })
        }
    }
}
</script>