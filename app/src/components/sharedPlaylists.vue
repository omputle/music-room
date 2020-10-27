<template>
    <div v-if="plays">
        <v-card max-width="800" class="mx-auto overflow-hidden">
            <v-app-bar dark elevate-on-scroll scroll-target="#scrolling-techniques-7">
                <v-spacer></v-spacer>
                <v-toolbar-title class="headline font-weight-light">shared playlists</v-toolbar-title>
                <v-spacer></v-spacer>
                
            </v-app-bar>
            <v-sheet id="scrolling-techniques-7" class="overflow-y-auto" max-height="800">
                <v-container style="max-height: 600px">
                    <v-list>
                        <v-list-group v-for="(item, index) in plays" :key="index" no-action>
                            <v-app-bar dense flat>
                                <v-spacer></v-spacer>
                                <addToSharedPlaylist :playlist_id="item.id"/>
                            </v-app-bar>
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
                                    <v-list-item-title>{{track.title}} - {{track.artist.name}}</v-list-item-title>
                                </v-list-item-content>
                                <v-btn text @click="removeTrack(item.id, track.id)">
                                    <v-icon>mdi-minus</v-icon>
                                </v-btn>
                                <v-list-item-icon @click="playMusic(track.id)">
                                    <v-icon>{{playIcon(track.id)}}</v-icon>
                                </v-list-item-icon>
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
import { mdiPlay, mdiStop } from '@mdi/js'
import addToSharedPlaylist from '@/components/addToSharedPlaylist'

export default {
    name: 'Playlists',
    components: {
        addToSharedPlaylist
    },
    data() {
        return {
            play: {},
            id: '',
            dialog: false,
            del: false,
            remote: false,
            name: '',
            check: {}
        }
    },
    computed: {
        plays() {
            return this.$store.state.music.sharedPlaylists},
        friends() {
            this.openSocket(this.$store.state.user.profile.username)
            return this.$store.state.user.friends[0].friends
        }
    },
    methods: {
        removeTrack(pid, tid) {
            this.$store.dispatch('music/removeFromSharedPlaylist', {
                'playlist_id': pid,
                'track_id': tid,
                'token': localStorage.getItem("jwt")
            })
            this.ws.send(`{
                "receiver":"/${this.$store.state.user.friend.profile.name}",
                "type":"shareplaylist"
            }`)
        },
        playIcon(track_id) {
            return this.id === track_id ? mdiStop : mdiPlay
        },
        playMusic(track_id) {
            if (this.id === track_id) {
                this.id = ''
                bus.$emit('kill-music')
            } else {
                this.id = track_id
                get(`/music/song-info/${track_id}`)
                .then(r => {
                    let muse = `https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&color=EF5466&layout=dark&size=small&type=tracks&id=${r.data.id}&app_id=1`
                    bus.$emit('player-music', muse)
                }).catch(e => {console.log(e)})
            }
        }
    },
    created() {
        this.$store.dispatch('music/getSharedPlaylists')
    }
}
</script>