<template>
    <div>
        <!-- <addToPlaylists /> -->
        <results v-if="found" :found="found" />
        <playlists />
        <sharedPlaylists />
    </div>
</template>

<script>
import playlists from '@/components/playlists'
import sharedPlaylists from '@/components/sharedPlaylists'
import results from '@/components/search_results'
//import addToPlaylists from '@/components/addToPlaylist'

export default {
    name: 'Music',
    components: {
        playlists,
        sharedPlaylists,
        results,
        //addToPlaylists
    },
    data() {
        return {
            plays: [],
            track: false,
            music: ''
        }
    },
    computed: {
        found() {return this.$store.state.music.found},
    }
}
</script>