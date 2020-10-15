<template>
    <v-footer dark padless >
    <v-card class="flex" flat tile>
      <v-card-title class="white mx-auto">
        <v-spacer></v-spacer>
            <iframe v-if="track" id="music_player" scrolling="no" frameborder="0" allowTransparency="true" :src="music">
            </iframe>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>ksefeane | omputle</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
import bus from '@/event_bus/bus'

export default {
    name: 'Footbar',
    data() {
        return {
            track: false,
            music: ''
        }
    },
    mounted() {
        bus.$on('player-music', m => {
            this.track = true
            this.music = m
        })
        bus.$on('kill-music', () => {this.track = false})
    }
}
</script>
