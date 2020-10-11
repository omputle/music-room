<template>
    <v-app-bar app dark dense prominent flat>
        
<!-- <span v-if="login">
                <router-link to="/user">User</router-link> |
                <router-link to="/music">Music</router-link>
            </span> -->
        <div v-if="login">
            <router-link to="/user">
                <v-btn icon>
                    <v-icon>mdi-account</v-icon>
                </v-btn>
            </router-link>
            <router-link to="/music">
                <v-btn icon>
                    <v-icon>mdi-music</v-icon>
                </v-btn>
            </router-link>
        </div>
        
        <v-toolbar-title class="headline font-weight-light">
            Music-Room
        </v-toolbar-title>
            
        <v-spacer></v-spacer>
        
        <v-btn icon v-if="login" @click="logout">
            <v-icon>mdi-logout-variant</v-icon>
        </v-btn>
        <v-btn icon v-else href="http://localhost:5000/auth/google">
            login
        </v-btn>
    </v-app-bar>
</template>

<script>
export default {
    name: 'Navbar',
    data() {
        return {
            login: false
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
    created() {
        this.isLoggedIn()
    }
}
</script>