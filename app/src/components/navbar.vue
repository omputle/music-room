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
        <v-btn icon v-else href="http://localhost:5000/auth/google">
            login
        </v-btn>
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
            login: false,
            searchBox: false
        }
    },
    methods: {
        isLoggedIn() {
            this.login = localStorage.getItem("jwt") ? true : false
        },
        logout() {
            localStorage.removeItem("jwt")
            localStorage.removeItem("deez")
            this.login = false
            this.$router.push('/')
        }
    },
    mounted() {
    },
    watch: {
        $route (to) {
            
            this.searchBox = to.name === 'Music' ? true : false
        }
    },
    created() {
        this.isLoggedIn()
    }
}
</script>