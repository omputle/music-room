<template>
    <div>
        <results v-if="found" :found="found" />
        <playlists />
    </div>
</template>

<script>
import playlists from '@/components/playlists'
import results from '@/components/search_results'

export default {
    name: 'Music',
    components: {
        playlists,
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
    },
    created() {
        this.$store.dispatch('music/getPlaylists')
    }
}
</script>