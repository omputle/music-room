<template>
    <div class="">
        <h3>playlists</h3>
        <div v-for="(play, index) in plays" :key="index">
            <tracklist :playlist="play" @play-music="playMusic" />
        </div>
    </div>
</template>

<script>

import tracklist from '@/components/tracklist'

export default {
    name: 'Playlists',
    props: {
        plays: Array
    },
    components: {
        tracklist
    },
    methods: {
        playMusic(music) {
            console.log('kid2 '+music)
            this.$emit('player-music', music)
        }
    }
}
</script>
<style scoped>

</style>