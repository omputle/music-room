<template>
    <div>
        <!-- <button @click="fetch_list">Fetch Playlists</button> <br> -->
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
            playlists: []
        }
    },
    methods: {
        fetch_list() {
            // let url = 'http://localhost:5000/user/get-playlist'
            // axios.post(url, {
            //     'token': access_token
            // }).then((results) => {
            //     console.log(results)
            //     this.playlists = results.data.data
            // }).catch((err) => {
            //     console.log(err)
            // })
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
        }
    },
    created() {
        this.fetch_list()
    }
}
</script>