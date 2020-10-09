<template>
    <div>
        <h2>Remove songs from {{playlist_name}}</h2>
        <div>
            <ol>
                <div v-for="song in songs" :key="song">
                    <li>{{song.title}} - {{song.artist.name}} | <button @click="remove_song(song.id)">Remove</button></li>
                </div>
            </ol>
        </div>
        <router-link :to="'/playlist/' + playlist_id">Back to {{playlist_name}}</router-link>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            playlist_id: this.$route.params.id,
            songs: [],
            playlist_name: ''
        }
    },
    methods: {
        fetch_data() {
            axios({
                method: 'get',
                url: 'http://localhost:5000/music/playlist-info/' + this.playlist_id,
                headers: {'Authorization': `Bearer ${localStorage.getItem("deez")}`}
            }).then((results) => {
                console.log(results)
                this.songs = results.data.tracks.data
                this.playlist_name = results.data.title
            })
        },
        remove_song(song_id) {
            console.log(song_id)
            axios({
                method: 'delete',
                url: `http://localhost:5000/music/removeFromPlaylist`,
                headers: {'Authorization': `Bearer ${localStorage.getItem("deez")}`},
                data: {
                    'playlist_id': this.playlist_id,
                    'track_id': song_id
                }
            }).then((results) => {
                console.log(results)
                if (results.data === true) {
                    console.log("Yebo")
                    this.fetch_data()
                }
            })
        }
    },
    created() {
        this.fetch_data()
    }
}
</script>