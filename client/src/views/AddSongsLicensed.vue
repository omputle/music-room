<template>
    <div>
        <router-link :to="'/playlist-license/' + playlist_id">Back</router-link>
        <h1>Search Songs</h1>
        <div>   
            <input type="search" name="" id="" v-model="track" placeholder="Search Song">
            <button @click="search_track">Search Song</button>
        </div>

        <div v-for="track_found in tracks_found" :key="track_found">
            <div>
                <img :src="track_found.album.cover" alt="">
                <p>{{track_found.title}}</p>
                <p>{{track_found.artist.name}}</p>
                <small>Album: {{track_found.album.title}}</small>
                <button @click="add_song(track_found.id)">Add to playlist</button>
            </div>
            <hr>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            playlist_id: this.$route.params.id,
            track: '',
            tracks_found: [],
            connection: null
        }
    },
    methods: {
        search_track() {
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
        add_song(song_id) {
            axios({
                method: 'post',
                url: 'http://localhost:5000/music/addToPlaylist-license',
                headers: {'Authorization': `Bearer ${localStorage.getItem("deez")}`},
                data: {
                    'playlist_id': this.playlist_id,
                    'track_id': song_id,
                    'token': localStorage.getItem('jwt')
                }
            }).then((results) => {
                console.log(results)
                if (results.data === true) {
                    console.log('song added')
                    let update = {
                        'type': 'edit',
                    }
                    this.connection.send(JSON.stringify(update))
                }
            })
        }
    },
    created() {
        this.connection = new WebSocket('ws://localhost:5001')
    }
}
</script>