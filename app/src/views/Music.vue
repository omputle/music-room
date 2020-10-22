<template>
    <div>
        <results v-if="found" :found="found" />
        <playlists />
        <sharedPlaylists />
    </div>
</template>

<script>
import playlists from '@/components/playlists'
import sharedPlaylists from '@/components/shared_playlists'
import results from '@/components/search_results'

export default {
    name: 'Music',
    components: {
        playlists,
        sharedPlaylists,
        results
    },
    data() {
        return {
            plays: [],
            track: false,
            music: '',
        }
    },
    computed: {
        found() {return this.$store.state.music.found}
    }
}
</script>