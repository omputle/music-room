<template>
    <div>
        <h1>Search Songs</h1>
        <input type="search" name="" id="" v-model="track" placeholder="Search Song">
        <button @click="search_track">Search Song</button>
        <div>
            <input type="search" name="" id="" v-model="album" placeholder="Search Album">
            <button @click="search_album">Search Album</button>
        </div>
        <div>
            <input type="search" name="" id="" v-model="singer" placeholder="Search Artist">
            <button @click="search_singer">Search Artist</button>
        </div>

        <div v-for="track_found in tracks_found" :key="track_found">
            <div>
                <router-link :to="'/play-song/' + track_found.id">
                <img :src="track_found.album.cover" alt="">
                <p>{{track_found.title}}</p>
                <p>{{track_found.artist.name}}</p>
                <small>Album: {{track_found.album.title}}</small>
                </router-link>
            </div>
            <hr>
        </div>
        <div v-for="album_found in albums_found" :key="album_found">
            <router-link :to="'/album/' + album_found.id">
                <img :src="album_found.cover_medium" alt="">
                <p>{{album_found.title}}</p>
                <small>{{album_found.artist.name}}</small>
            </router-link>
        </div>
        <div v-for="singer in singers_found" :key="singer">
            <router-link :to="'/artist/' + singer.id">
                <img :src="singer.picture_medium" alt="">
                <p>{{singer.name}}</p>
            </router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            track: '',
            album: '',
            singer: '',
            albums_found: [],
            singers_found: [],
            tracks_found: []
        }
    },
    methods: {
        search_track() {
            this.clear_inputs()
            axios({
                method: 'get',
                url: 'http://localhost:5000/music/search-track/' + this.track
            }).then((res) => {
                console.log(res.data.data)
                this.tracks_found = res.data.data
            }).catch((err) => {
                console.log(err)
            })
        },
        search_album() {
            this.clear_inputs()
            axios({
                method: 'get',
                url: 'http://localhost:5000/music/search-album/' + this.album
            }).then((res) => {
                console.log(res)
                this.albums_found = res.data.data
            }).catch((err) => {
                console.log(err)
            })
        },
        search_singer() {
            this.clear_inputs()
            axios({
                method: 'get',
                url: 'http://localhost:5000/music/search-artist/' + this.singer
            }).then((res) => {
                console.log(res)
                this.singers_found = res.data.data
            }).catch((err) => {
                console.log(err)
            })
        },
        clear_inputs() {
            this.albums_found = []
            this.tracks_found = []
            this.singers_found = []
        }
    }
}
</script>