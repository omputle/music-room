<template>
    <v-app-bar app dense prominent flat>
        <v-toolbar-title class="headline font-weight-light">
            Music Room
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <searchbox v-if="searchBox" />
        <div v-if="login">
            <router-link to="/user" class="text-decoration-none">
                <v-btn icon>
                    <v-icon>mdi-account</v-icon>
                </v-btn>
            </router-link> 
            <router-link to="/music" class="text-decoration-none">
                <v-btn icon>
                    <v-icon>mdi-music</v-icon>
                </v-btn>
            </router-link>
        </div>
        <v-btn icon v-if="login" @click="logout">
            <v-btn icon>
                    <v-icon>mdi-logout-variant</v-icon>
                </v-btn>
        </v-btn>
        <div v-else>
            <v-btn icon href="http://localhost:5000/api-documentation">
                api's
            </v-btn> | 
            <v-btn icon href="http://localhost:5000/auth/google">
                login
            </v-btn>
        </div>
        
        
    </v-app-bar>
</template>

<script>
import searchbox from '@/components/searchbox'

export default {
    name: 'Navbar',
    components: {
        searchbox
    },
    data() {
        return {
            searchBox: false,
            track: false,
            music: '',
        }
    },
    computed: {
        login() {return this.$store.state.user.login}
    },
    methods: {
        logout() {
            this.$store.dispatch('user/loginStatus', false)
            this.$router.push('/')
        },
        playMusic(m) {
            this.track = true
            this.music = m
        }
    },
    watch: {
        $route (to) {
            this.searchBox = to.name === 'Music' ? true : false
        }
    },
}
</script>