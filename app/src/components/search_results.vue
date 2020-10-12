<template>
    <div class="">
        <h3>results</h3>
        <div v-for="(find, index) in found" :key="index">
            <div v-for="f in find.data.data" :key="f.id">
                <p>{{f.title}}</p>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Playlists',
    props: {
        found: Array
    },
    components: {
    },
    methods: {
        playMusic(music) {
            this.$emit('player-music', music)
        }
    },
    created() {
        
    }
}
</script>