<template>
    <div class="panel_item">
        <h3>playlists</h3>
    </div>
</template>

<script>
//import axios from 'axios'

export default {
    name: 'Playlists',
    props: {
        username: String
    },
    data() {
        return {
            playlists: []
        }
    },
    methods: {
        async getMusic() {
            console.log('test')
        }
    },
    created(){
        //this.getMusic()
    }
}
</script>
<style scoped>

</style>