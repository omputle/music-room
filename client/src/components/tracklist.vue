<template>
    <div class="panel_item">
        <h5>{{playlist.title}}</h5>
        <div v-for="(track, index) in tracks" :key="index">
            <p>{{track.title}}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Tracklist',
    props: {
        playlist: Object
    },
    data() {
        return {
            tracks: []
        }
    },
    methods: {
        getTracklist() {
            axios({
                method: 'get',
                url: `http://localhost:5000/music/getTracks/${this.playlist.id}`,
                headers: {'Authorization': `Bearer ${localStorage.getItem("deez")}`}
            }).then(r => {this.tracks = r.data})
            .catch(e => {console.log(e)})
            console.log(this.tracs)
        }
    },
    computed: {
    },
    created() {
        this.getTracklist()
    }
}
</script>
<style scoped>

</style>