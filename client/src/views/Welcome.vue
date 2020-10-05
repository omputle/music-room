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
                <img :src="track.artist.picture_medium" alt="">
                <p>{{track.title}}</p>
                <small>{{track.artist.name}}</small>
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
            // artists: [],
            tracks: []
        }
    },
    methods: {
        get_list() {
            let url = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart'
            axios.get(url).then((res) => {
                console.log(res)
                this.albums = res.data.albums.data
                // this.artists = res.data.artists.data
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