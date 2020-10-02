<template>
    <div>
        <p>{{artist}}</p>
        <input type="search" name="" id="" v-model="artist">
        <button @click="search">Search</button>

        <div v-for="file in info" :key="file">
            <div>
                <img :src="file.album.cover" alt="">
                <p>{{file.title}}</p>
                <p>{{file.artist.name}}</p>
                <small>Album: {{file.album.title}}</small>
            </div>
            <hr>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            artist: '',
            info: []
        }
    },
    methods: {
        search() {
            let url = 'https://cors-anywhere.herokuapp.com/http://api.deezer.com/search?q=' + this.artist
            // (https://stackoverflow.com/questions/52985844/failed-call-to-deezer-api-with-react-and-axios)

            // const headers = {
            //     "Access-Control-Allow-Origin": "*"
            // }
            axios.get(url).then((res) => {
                console.log(res.data.data)
                this.info = res.data.data
            }).catch((err) => {
                console.log(err)
            })
        }
    }
}
</script>