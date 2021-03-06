<template>
    <div>
        <v-card max-width="800" class="mx-auto overflow-hidden">
            <v-app-bar dark elevate-on-scroll scroll-target="#scrolling-techniques-7">
                <!-- remote button -->
                <v-dialog v-model="remote" width="500">
                    <template v-slot:activator="{ on }">
                        <v-chip class="transparent" close :close-icon="allowIcon()" @click:close="allowance">
                            <v-icon v-on="on">mdi-remote</v-icon>
                        </v-chip>
                    </template>
                    <v-card>
                        <v-card-title class="headline font-weight-light">music control delegation</v-card-title>
                        <v-container style="max-height: 600px">
                            <v-list-item v-for="f in friends" :key="f.id">
                                <v-list-item-content>
                                    <v-list-item-title v-text="f.name"></v-list-item-title>
                                </v-list-item-content>
                                <v-checkbox v-model="check[f.id]"></v-checkbox>
                            </v-list-item>
                        </v-container>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text @click="giveControl">delegate</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-spacer></v-spacer>
                <v-toolbar-title class="headline font-weight-light">playlists</v-toolbar-title>
                <v-spacer></v-spacer>
                <!-- create playlist button -->
                <v-dialog v-model="dialog" width="500">
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon v-bind="attrs" v-on="on">mdi-note-plus</v-icon>
                    </template>
                    <v-card>
                        <v-card-title class="headline font-weight-light">
                            create new playlist
                        </v-card-title>
                        <form>
                            <v-text-field v-model="name" label="playlist name"></v-text-field>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                                <v-btn text @click="createPlaylist">create</v-btn>
                            </v-card-actions>
                        </form>
                    </v-card>
                </v-dialog>
            </v-app-bar>
            <v-sheet id="scrolling-techniques-7" class="overflow-y-auto" max-height="800">
                <v-container style="max-height: 600px">
                    <v-list>
                        <v-list-group v-for="(item, index) in plays" :key="index" no-action>
                            <v-app-bar dense flat>
                                <!-- delete playlist button -->
                                <v-dialog v-model="del" width="500">
                                    <template v-slot:activator="{ on }">
                                        <v-icon v-on="on">mdi-note-minus</v-icon>
                                    </template>
                                        <v-card>
                                            <v-card-title class="headline font-weight-light">delete playlist {{item.title}}</v-card-title>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn text @click="deletePlaylist(item.id)">delete</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                </v-dialog>
                                <v-spacer></v-spacer>
                                <v-icon @click="visibility(item.id, !item.public)">{{visible(item.public)}}</v-icon>
                                <v-spacer></v-spacer>
                                <!-- share playlist button -->
                                <v-dialog v-model="share" width="500">
                                    <template v-slot:activator="{ on }">
                                        <v-icon v-on="on" >mdi-share-variant</v-icon>
                                    </template>
                                    <v-card>
                                        <v-card-title class="headline font-weight-light">share playlist</v-card-title>
                                        <v-container style="max-height: 600px">
                                            <v-list-item v-for="f in friends" :key="f.id">
                                                <v-list-item-content>
                                                    <v-list-item-title v-text="f.name"></v-list-item-title>
                                                </v-list-item-content>
                                                <v-checkbox v-model="scheck[f.id]"></v-checkbox>
                                            </v-list-item>
                                        </v-container>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn text @click="sharePlaylist(item.id, item.title)">share</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                                <v-spacer></v-spacer>
                                <!-- add to playlist button -->
                                <addToPlaylist :playlist_id="item.id"/>
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
                                    <v-list-item-title >{{track.title}} - {{track.artist.name}}</v-list-item-title>
                                </v-list-item-content>
                                <v-btn text @click="removeTrack(item.id, track.id)">
                                    <v-icon>mdi-minus</v-icon>
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
import { get } from '@/functions/api'
import bus from '@/event_bus/bus'
import { mdiPlay, mdiStop, mdiCircleOutline, mdiCircleSlice8, mdiLock, mdiLockOpenVariant } from '@mdi/js'
import addToPlaylist from '@/components/addToPlaylist'

export default {
    name: 'Playlists',
    components: {
        addToPlaylist
    },
    data() {
        return {
            play: {},
            id: '',
            dialog: false,
            del: false,
            share: false,
            remote: false,
            name: '',
            check: {},
            scheck: {},
        }
    },
    computed: {
        plays() {return this.$store.state.music.playlists},
        friends() {
            return this.$store.state.user.friends[0].friends
        },
        allow() {return this.$store.state.music.delegate},
    },
    methods: {
        visible(v) {return v ? mdiLockOpenVariant : mdiLock},
        visibility(pid, v) {
            this.$store.dispatch('music/playlistVisibility', {
                "id":pid,
                "vis":v
            })
        },
        allowance() {
            this.$store.dispatch('music/allowDelegate')
        },
        allowIcon() {
            return this.allow ? mdiCircleSlice8 : mdiCircleOutline
        },
        giveControl() {
            this.$store.dispatch('music/delegateControl', {
                'id': this.$store.state.user.profile.id,
                'friends': Object.keys(this.check)
            })
            this.ws.send(`{
                "receiver":"/${this.$store.state.user.friend.profile.name}",
                "type":"delegate"
            }`)
            this.remote = false
            this.check = {}
            this.allowance()
        },
        createPlaylist() {
            this.$store.dispatch('music/createPlaylist', this.name)
            this.dialog = false
            this.name = ''
        },
        deletePlaylist(pid) {
            this.$store.dispatch('music/deletePlaylist', pid)
            this.del = false
        },
        removeTrack(pid, tid) {
            this.$store.dispatch('music/removeFromPlaylist', {
                'playlist_id': pid,
                'track_id': tid
            })
        },
        sharePlaylist(pid, ptitle) {
            this.$store.dispatch('music/sharePlaylist', {
                'playlist_id': pid,
                'playlist_name': ptitle,
                'friends': Object.keys(this.scheck),
                'token': localStorage.getItem("jwt")
            })
            this.ws.send(`{
                "receiver":"/${this.$store.state.user.friend.profile.name}",
                "type":"shareplaylist"
            }`)
            this.share = false
            this.scheck = {}
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
        this.$store.dispatch('music/getPlaylists')
        this.openSocket()
    }
}
</script>