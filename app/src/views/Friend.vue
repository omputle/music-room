<template>
    <div>
        <!-- <v-card max-width="800" class="mx-auto overflow-hidden">
            <v-app-bar dark elevate-on-scroll scroll-target="#scrolling-techniques-7">
                <v-spacer></v-spacer>
                <v-toolbar-title class="headline font-weight-light">friends</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-app-bar>
            <v-sheet id="scrolling-techniques-7" class="overflow-y-auto" max-height="800">
                <v-container style="max-height: 600px">
                    <v-list>
                        <v-list-group v-for="(item, index) in friends" :key="index" no-action>
                            <template v-slot:activator>
                                <v-list-item-content>
                                    <v-list-item-title v-text="item.title"></v-list-item-title>
                                </v-list-item-content>
                            </template>
                            <v-list-item v-for="f in item.friends" :key="f.id">
                                <v-list-item-content>
                                    <v-list-item-title @click="currentFriend(f)">
                                        <router-link :to="{path: f.name}"  class="text-decoration-none black--text">
                                            {{f.name}}
                                        </router-link>
                                    </v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-avatar>
                                    <v-img :src="f.picture"></v-img>
                                </v-list-item-avatar>
                            </v-list-item>
                        </v-list-group>
                    </v-list>
                </v-container>
            </v-sheet>
        </v-card> -->
        <v-card max-width="800" class="mx-auto">
            <v-app-bar dark>
                <v-spacer></v-spacer>
                <v-toolbar-title class="headline font-weight-light">profile</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-app-bar>
            
            <v-sheet id="scrolling-techniques-7" class="overflow-y-auto" max-height="800">
                <v-container v-if="friend" style="max-height: 400px">
                    <v-list-item-avatar class="ma-3" size="125">
                        <v-img v-if="friend.profile" :src="friend.profile.picture_small"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-title>{{friend.profile.name}}</v-list-item-title>
                </v-container>
            </v-sheet>
        </v-card>
        <v-card max-width="800" class="mx-auto overflow-hidden">
            <v-app-bar dark elevate-on-scroll scroll-target="#scrolling-techniques-7">
                <v-spacer></v-spacer>
                <v-toolbar-title class="headline font-weight-light">playlists</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-app-bar>
            <v-sheet id="scrolling-techniques-7" class="overflow-y-auto" max-height="800">
                <v-container style="max-height: 600px">
                    <v-list>
                        <v-list-group v-for="(item, index) in friend.playlists" :key="index" no-action>
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
                                <v-btn text v-if="control" @click="controlPlay(track.id, track.title)">
                                    <v-icon>mdi-remote</v-icon>
                                </v-btn>
                                <v-btn text @click="playMusic(track.id)">
                                    <v-icon>{{playIcon(track.id)}}</v-icon>
                                </v-btn>
                                
                            </v-list-item>
                        </v-list-group>
                    </v-list>
                </v-container>
            </v-sheet>
        </v-card>

    </div>
</template>

<script>
import bus from '@/event_bus/bus'
import { mdiStop, mdiPlay} from '@mdi/js'
import { get } from '@/functions/api'

export default {
    name: 'Friend',
    data() {
        return {
            id: '',
            cnx: '',
            msg: '',
            sender: '',
        }
    },
    computed: {
        friend() {
            return this.$store.state.user.friend
        },
        friends() {return this.$store.state.user.friends},
        control() {
            this.checkControl()
            return this.$store.state.music.control
        }
    },
    methods: {
        currentFriend(friend) {
            this.$store.dispatch('user/currentFriend', friend)
        },
        playIcon(track_id) {return this.id === track_id ? mdiStop : mdiPlay},
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
        },
        controlPlay(id, title) {
            if (this.control) {
                this.ws.send(`{ 
                    "receiver":"/${this.$store.state.user.friend.profile.name}",
                    "title":"${title}",
                    "id":"${id}"
                }`)
            }
        },
        checkControl() {
            this.$store.dispatch('music/checkControl', {
                'uid': this.$store.state.user.profile.id,
                'fid': this.$store.state.user.friend.profile.id
            })
        }
    },
    created() {
        this.openSocket(this.$store.state.user.profile.username)
    }
}
</script>