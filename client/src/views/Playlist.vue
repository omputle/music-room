<template>
    <div>
        <h2>{{playlist_name}}</h2>
        <img :src="cover" alt=""> <br>
        <p>{{creator}}</p>
        <router-link :to="'/playlist/' + playlist_id + '/add'">Add songs to {{playlist_name}}</router-link> | 
        <router-link :to="'/playlist/' + playlist_id + '/remove'">Remove songs from {{playlist_name}}</router-link>
        <div>
            <h3>Followers</h3>
            <ol>
                <div v-for="follower in followers" :key="follower">
                    <li>{{follower.name}} => <button @click="give_license(follower.id)">Give License</button> | <button @click="remove_license(follower.id)">Remove license</button></li>
                </div>
            </ol>
        </div>
        <div class="songs">
            <ol>
                <div v-for="song in songs" :key="song">
                    <li @click="play_track(song)">{{song.title}} - {{song.artist.name}}</li>
                </div>
            </ol>
        </div>
        <div>
            <iframe scrolling="yes" frameborder="0" allowTransparency="true" :src="music"></iframe>
            <!-- <audio :src="play" controls v-if="play" autoplay></audio> -->
        </div>
        <button @click="delete_playlist">Delete playlist {{playlist_name}}</button>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            playlist_id: this.$route.params.id,
            songs: [],
            creator: '',
            cover: '',
            playlist_name: '',
            play: '',
            music: '',
            followers:[],
            connection: null
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
                this.playlist_name = results.data.title
                this.creator = results.data.creator.name
                this.cover = results.data.picture_big
                this.songs = results.data.tracks.data
            }).catch((err) => {
                console.log(err)
            })
        },
        delete_playlist() {
            axios({
                method: 'delete',
                url: 'http://localhost:5000/music/delete-playlist',
                headers: {'Authorization': `Bearer ${localStorage.getItem("deez")}`},
                data: {
                    'playlist_id': this.playlist_id
                }
            }).then((results) => {
                console.log(results)
                this.$router.push('/okay')
            })
        },
        fetch_profile() {
            axios({
                method: 'get',
                url: `http://localhost:5000/user/me`,
                headers: {'Authorization': `Bearer ${localStorage.getItem("deez")}`}
            }).then(res => {console.log(res)})
            .catch(e => {console.log(e)})
        },
        fetch_friends() {
            axios({
                method: 'get',
                url: `http://localhost:5000/user/friends`,
                headers: {'Authorization': `Bearer ${localStorage.getItem("deez")}`}
            }).then(res => {
                console.log(res)
                this.followers = res.data.followers
            })
            .catch(e => {console.log(e)})
        },
        give_license(user_id) {
            axios({
                method: 'post',
                url: `http://localhost:5000/user/give-license`,
                data: {
                    'user_id': user_id,
                    'playlist_id': this.playlist_id,
                    'playlist_name': this.playlist_name,
                    'token': localStorage.getItem("jwt")
                },
                headers: {'Authorization': `Bearer ${localStorage.getItem("deez")}`}
            }).then((res) => {
                console.log(res)
                let update = {
                    'type': 'license',
                }
                this.connection.send(JSON.stringify(update))
            }).catch((err) => {
                console.log(err)
            })
        },
        remove_license(user_id) {
            axios({
                method: 'post',
                url: `http://localhost:5000/user/revoke-license`,
                data: {
                    'user_id': user_id,
                    'playlist_id': this.playlist_id,
                },
                headers: {'Authorization': `Bearer ${localStorage.getItem("deez")}`}
            }).then((res) => {
                console.log(res)
                let update = {
                    'type': 'license',
                }
                this.connection.send(JSON.stringify(update))
            }).catch((err) => {
                console.log(err)
            })
        },
        play_track(song) {
            this.play = song.preview
            
        }
    },
    created() {
        this.fetch_data()
        this.fetch_profile()
        this.fetch_friends()
        this.music = `https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=700&height=1000&color=EF5466&layout=dark&size=medium&type=playlist&id=${this.playlist_id}&app_id= 437882"`
        this.connection = new WebSocket('ws://localhost:5001')
        this.connection.onopen = () => {
            console.log('Connection opened playlist')
        }
        this.connection.onmessage = (event) => {
            console.log(event.data)
            let res = JSON.parse(event.data)
            if (res.type === "edit") {
                console.log('an edit occured')
                this.fetch_data()
            }
        }
    }
}
</script>

<style scoped>
li {
    text-align: left;
}
.songs li:hover {
    color: brown;
}
.songs {
    float: right;
}
iframe {
    width: 100%;
    height: 500px;
}
</style>