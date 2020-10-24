<template>
    <div>
        <v-dialog v-model="add" width="500">
            <template v-slot:activator="{ on }">
                <v-icon v-on="on">mdi-music-note-plus</v-icon>
            </template>
            <v-card class="mx-auto overflow-hidden" max-width="500"  style="max-height: 800px">
                <v-app-bar flat elevate-on-scroll scroll-target="#scrolling-techniques-7" color="transparent">
                    <v-toolbar-title>add to playlist</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-text-field ref="search" v-model="search" append-icon="mdi-magnify" @click:append="searchSong" solo flat full-width hide-details label="Search"></v-text-field>
                    <v-btn :disabled="!selected.length" :loading="loading" text @click="addSongs"><v-icon>mdi-plus</v-icon></v-btn>
                </v-app-bar>
                <v-container class="py-0">
                    <v-row align="center" justify="start">
                        <v-col v-for="(selection, i) in selections" :key="selection.text" class="shrink">
                            <v-chip :disabled="loading" close @click:close="selected.splice(i, 1)" outlined>{{ selection.title }}</v-chip>
                        </v-col>
                    </v-row>
                </v-container>
                <v-divider v-if="!allSelected"></v-divider>
                <v-sheet id="scrolling-techniques-7" class="overflow-y-auto" max-height="800">
                    <v-list>
                        <template v-for="item in songs">
                            <v-list-item v-if="!selected.includes(item)" :key="item.id" :disabled="loading" @click="selected.push(item)">
                                <v-list-item-avatar>
                                    <v-img  :src="item.artist.picture_small"></v-img>
                                </v-list-item-avatar>
                                <v-list-item-title>{{item.title}} - {{item.artist.name}}</v-list-item-title>
                            </v-list-item>
                        </template>
                    </v-list>
                </v-sheet>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>

export default {
    data() {
        return {
            loading: false,
            search: '',
            find: null,
            selected: [],
            add: false
        }
    },
    props: {
        playlist_id: Number
    },
    computed: {
        songs() {
            return this.$store.state.music.songs},
      allSelected () {return this.selected.length === this.songs.length},
      selections () {
        const selections = []
        for (const selection of this.selected) {
          selections.push(selection)
        }
        return selections
      },
    },
    methods: {
      searchSong() {
          if (this.search) {
              this.$store.dispatch('music/searchSong', this.search)
          }
      },
      addSongs() {
            this.$store.dispatch('music/addToPlaylist', {
                'playlist_id': this.playlist_id,
                'tracks': this.selections
            })
            this.loading = true
            setTimeout(() => {
                this.search = ''
                this.selected = []
                this.loading = false
                this.add = false
            }, 2000)
      }
    }
  }
</script>