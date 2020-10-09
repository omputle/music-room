<template>
    <div>
        <div class="albums">
            <h3>Top Albums</h3>
            <div v-for="album in albums" :key="album">
                <router-link :to="'/album/' + album.id">
                <img :src="album.cover_medium" alt="">
                <p>{{album.title}}</p>
                <small>{{album.artist.name}}</small>
                </router-link>
            </div>
        </div>
        <!-- <div class="artists">
            <h3>Top Arists</h3>
            <div v-for="artist in artists" :key="artist">
                <img :src="artist.picture_medium" alt="">
                <p>{{artist.name}}</p>
            </div>
        </div> -->
        <div class="tracks">
            <h3>Top Tracks</h3>
            <div v-for="track in tracks" :key="track">
                <router-link :to="'/play-song/' + track.id">
                <img :src="track.artist.picture_medium" alt="">
                <p>{{track.title}}</p>
                <small>{{track.artist.name}}</small>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            albums: [],
            tracks: []
        }
    },
    methods: {
        get_list() {
            axios({
                method: 'get',
                url: 'http://localhost:5000/music/chart'
            }).then((res) => {
                console.log(res)
                this.albums = res.data.albums.data
                this.tracks = res.data.tracks.data
            }).catch((err) => {
                console.log(err)
            })
        }
    },
    created() {
        this.get_list()
    }
}
</script>

<style scoped>
.albums{
    float: left;
}
.tracks {
    float:right;
}
</style>