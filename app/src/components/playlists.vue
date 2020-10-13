<template>
    <div>
        <v-card max-width="800" class="mx-auto overflow-hidden">
            <v-app-bar dark elevate-on-scroll scroll-target="#scrolling-techniques-7">
                <v-spacer></v-spacer>
                <v-toolbar-title class="headline font-weight-light">playlists</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-app-bar>

            <v-sheet id="scrolling-techniques-7" class="overflow-y-auto" max-height="800">
                <v-container style="max-height: 600px">
                    <v-list>
                        <v-list-group v-for="(item, index) in plays" :key="index" no-action>
                            <template v-slot:activator>
                                <v-list-item-avatar>
                                    <v-img :src="item.img"></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title v-text="item.title"></v-list-item-title>
                                </v-list-item-content>
                            </template>
                            <v-list-item v-for="track in item.tracks" :key="track.id">
                                <v-list-item-avatar>
                                    <v-img :src="track.artist.picture_small"></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title v-text="track.title"></v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-icon @click="playMusic(track.id)"><v-icon>mdi-play</v-icon></v-list-item-icon>
                            </v-list-item>
                        </v-list-group>
                    </v-list>
                </v-container>
            </v-sheet>
        </v-card>
    </div>
</template>

<script>
import { get } from '@/functions/api'
import bus from '@/event_bus/bus'

export default {
    name: 'Playlists',
    props: {
        plays: Array,
    },
    methods: {
        playMusic(track_id) {
            get(`/music/song-info/${track_id}`)
            .then(r => {
                let muse = `https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&color=EF5466&layout=transparent&size=small&type=tracks&id=${r.data.id}&app_id=1`
                bus.$emit('player-music', muse)
            }).catch(e => {console.log(e)})
        }
    }
}
</script>