<template>
    <div>
       <button @click="getPlaylist">get</button>
       <button @click="addToPlaylist">add</button>
       <button @click="removeFromPlaylist">remove</button>
       <playlists :plays="plays" />
    </div>
</template>

<script>
import axios from 'axios'

import playlists from '@/components/playlists'

export default {
    name: 'Music',
    components: {
        playlists
    },
    data() {
        return {
            plays: []
        }
    },
    methods: {
        getPlaylist() {
            axios({
                method: 'get',
                url: `http://localhost:5000/music/getPlaylist`,
                headers: {'Authorization': `Bearer ${localStorage.getItem("deez")}`}
            }).then(r => {
                console.log(r.data)

                this.plays = r.data
            })
            .catch(e => {console.log(e)})
        },
        addToPlaylist(){
            axios({
                method: 'post',
                url: `http://localhost:5000/music/addToPlaylist`,
                headers: {'Authorization': `Bearer ${localStorage.getItem("deez")}`},
                data: {
                    'playlist_id':8204141162,
                    'track_id':2553265
                }
            }).then(r => {console.log(r.data)})
            .catch(e => {console.log(e)})
        },
        removeFromPlaylist(){
            axios({
                method: 'delete',
                url: `http://localhost:5000/music/removeFromPlaylist`,
                headers: {'Authorization': `Bearer ${localStorage.getItem("deez")}`},
                data: {
                    'playlist_id':8204141162,
                    'track_id':2553265
                }
            }).then(r => {console.log(r.data)})
            .catch(e => {console.log(e)})
        }
    },
    created() {
        this.getPlaylist()
    }
}
</script>

<style scoped>
li {
    text-align: left;
}
li:hover {
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