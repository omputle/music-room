<template>
    <div>
        <div>
            <input type="search" name="" id="" placeholder="Playlist Name" v-model="playlist_name">
            <button @click="create_playlist">Create Playlist</button>
        </div>
        <div v-for="playlist in playlists" :key="playlist">
            <div>
                <router-link :to="'/playlist/' + playlist.id">
                    <img :src="playlist.picture_medium" alt="">
                    <h3>{{playlist.title}}</h3>
                    <p>Duration: {{playlist.duration}}</p>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
export default {
    data() {
        return {
            playlists: [],
            playlist_name: ''
        }
    },
    methods: {
        fetch_list() {
            axios({
                method: 'get',
                url: 'http://localhost:5000/music/get-playlist',
                headers: {'Authorization': `Bearer ${localStorage.getItem("deez")}`}
            }).then((results) => {
                console.log(results)
                this.playlists = results.data.data
            }).catch((err) => {
                console.log(err)
            })
        },
        create_playlist() {
            axios({
                method: 'post',
                url: 'http://localhost:5000/music/create-playlist',
                headers: {'Authorization': `Bearer ${localStorage.getItem("deez")}`},
                data: {
                    'playlist_name': this.playlist_name
                }
            }).then((results) => {
                console.log(results.data)
                this.fetch_list()
            }).catch((err) => {
                console.log(err)
            })
        }
    },
    created() {
        this.fetch_list()
    }
}
</script>