<template>
    <div class="">
        <v-card v-if="found.songs" max-width="800" class="mx-auto overflow-hidden">
            <v-app-bar dark elevate-on-scroll scroll-target="#scrolling-techniques-7">
                <v-spacer></v-spacer>
                <v-toolbar-title class="headline font-weight-light">songs</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-app-bar>
            <v-sheet id="scrolling-techniques-7" class="overflow-y-auto" max-height="800">
                <v-container style="max-height: 400px">
                    <v-list>
                        <v-list-item v-for="item in found.songs" :key="item.id">
                            <v-list-item-avatar>
                                <v-img :src="item.artist.picture_small"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title v-text="item.title"></v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-icon @click="playMusic(item.id)"><v-icon>mdi-play</v-icon></v-list-item-icon>
                        </v-list-item>
                    </v-list>
                </v-container>
            </v-sheet>
        </v-card>
        <v-card v-if="found.artists" max-width="800" class="mx-auto overflow-hidden">
            <v-app-bar dark elevate-on-scroll scroll-target="#scrolling-techniques-7">
                <v-spacer></v-spacer>
                <v-toolbar-title class="headline font-weight-light">artists</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-app-bar>
            <v-sheet id="scrolling-techniques-7" class="overflow-y-auto" max-height="800">
                <v-container style="max-height: 400px">
                    <v-list>
                        <v-list-item v-for="item in found.artists" :key="item.id">
                            <v-list-item-avatar>
                                <v-img :src="item.picture_small"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title v-text="item.name"></v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-icon @click="findAlbums(item.id)"><v-icon>mdi-play</v-icon></v-list-item-icon>
                        </v-list-item>
                    </v-list>
                </v-container>
            </v-sheet>
        </v-card>
        <v-card v-if="found.albums" max-width="800" class="mx-auto overflow-hidden">
            <v-app-bar dark elevate-on-scroll scroll-target="#scrolling-techniques-7">
                <v-spacer></v-spacer>
                <v-toolbar-title class="headline font-weight-light">albums</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-app-bar>
            <v-sheet id="scrolling-techniques-7" class="overflow-y-auto" max-height="800">
                <v-container style="max-height: 400px">
                    <v-list>
                        <v-list-item v-for="item in found.albums" :key="item.id">
                            <v-list-item-avatar>
                                <v-img :src="item.cover_small"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title v-text="item.title"></v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-icon @click="findTracks(item.id)"><v-icon>mdi-play</v-icon></v-list-item-icon>
                        </v-list-item>
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
        found: Object
    },
    methods: {
        playMusic(track_id) {
            get(`/music/song-info/${track_id}`)
            .then(r => {
                let muse = `https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&color=EF5466&layout=dark&size=small&type=tracks&id=${r.data.id}&app_id=1`
                bus.$emit('player-music', muse)
            }).catch(e => {console.log(e)})
        }
    }
}
</script>