<template>
    <div>
        <v-card max-width="800" class="mx-auto">
            <v-app-bar dark>
                <v-spacer></v-spacer>
                <v-toolbar-title class="headline font-weight-light">profile</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-app-bar>
            
            <v-sheet id="scrolling-techniques-7" class="overflow-y-auto" max-height="800">
                <v-container style="max-height: 400px">
                    <v-list-item-avatar class="ma-3" size="125">
                        <v-img :src="user.img"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-title v-text="user.username"></v-list-item-title>
                    <v-list-item-title v-text="user.first_name"></v-list-item-title>
                    <v-list-item-title v-text="user.last_name"></v-list-item-title>
                    <v-list-item-title v-text="user.email"></v-list-item-title>
                </v-container>
            </v-sheet>
        </v-card>
        <v-card max-width="800" class="mx-auto overflow-hidden">
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
                                    <v-list-item-title v-text="f.name"></v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-avatar>
                                    <v-img :src="f.picture"></v-img>
                                </v-list-item-avatar>
                            </v-list-item>
                        </v-list-group>
                    </v-list>
                </v-container>
            </v-sheet>
        </v-card>
        <v-card max-width="800" class="mx-auto">
            <v-app-bar dark>
                <v-spacer></v-spacer>
                <v-toolbar-title class="headline font-weight-light">settings</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-app-bar>
            <v-sheet id="scrolling-techniques-7" class="overflow-y-auto" max-height="800">
                <v-container style="max-height: 400px">
                    <v-list>
                        <v-list-item v-for="(u, index) in settings" :key="index">
                            <v-list-item-content>
                                <v-list-item-title v-text="u"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-container>
            </v-sheet>
        </v-card>
    </div>
</template>

<script>

export default {
    name: 'Profile',
    props: {
    },
    computed: {
        user() {
            return this.$store.state.user.profile
        },
        friends() {
            return this.$store.state.user.friends
        },
        settings() {
            return this.$store.state.user.settings
        }
    },
    methods: {
        
    },
    created() {

    }
}
</script>