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
        <h4>Licensed Playlists</h4>
        <div v-for="playlist in licensed_playlists" :key="playlist">
            <router-link :to="'/playlist-license/' + playlist.playlist_id">
                <p>{{playlist.playlist_name}}</p>
            </router-link>
        </div>
    </div>
</template>

<script>
import axios from "axios"
export default {
    data() {
        return {
            playlists: [],
            playlist_name: '',
            licensed_playlists: []
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
        },
        fetch_licenced_playlists() {
            axios({
                method: 'post',
                url: 'http://localhost:5000/user/get-licensed-playlists',
                data: {
                    token: localStorage.getItem('jwt')
                },
                headers: {'Authorization': `Bearer ${localStorage.getItem("deez")}`},
            }).then((result) => {
                console.log(result)
                this.licensed_playlists = result.data
            })
        }
    },
    created() {
        this.fetch_list()
        this.fetch_licenced_playlists()
    }
}
</script>