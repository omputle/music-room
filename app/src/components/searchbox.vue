<template>
    <v-form>
        <v-text-field
            solo
            dense
            label="song/artist/album/..."
            type="search"
            v-model="find"
            append-icon="mdi-magnify"
            @click:append="search"
        >
        </v-text-field>
    </v-form>
</template>

<script>
import { get } from '@/functions/api'
import bus from '@/event_bus/bus'

export default {
    name: 'Searchbox',
    data() {
        return {
            find: null
        }
    },
    methods: {
        async search() {
            if (this.find) {
                let song = get(`/music/search-track/${this.find}`)
                let artist = get(`/music/search-artist/${this.find}`)
                let album = get(`/music/search-album/${this.find}`)
                let r = await Promise.all([song,artist,album])
                    .catch(e => {console.log(e)})
                if (r) {
                    bus.$emit(`search-results`, {
                        'songs': r[0].data.data,
                        'artists': r[1].data.data,
                        'albums': r[2].data.data
                    })
                }
            }
        }
    }
}
</script>