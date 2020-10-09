<template>
    <div class="">
        <h3>playlists</h3>
        <div v-for="(play, index) in plays" :key="index">
            <tracklist :playlist="play" />
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
    }
}
</script>
<style scoped>

</style>