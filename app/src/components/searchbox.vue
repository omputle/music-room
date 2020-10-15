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
                this.$store.dispatch('music/searchAll', this.find)
            }
        }
    }
}
</script>