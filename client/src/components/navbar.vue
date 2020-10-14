<template>
    <div>
        <div v-if="login">
            <button @click="logout">log out</button> |
            <router-link to="/user">User</router-link> |
            <router-link to='/search'>Search</router-link> | 
            <router-link to='/welcome'>Welcome</router-link> |
            <router-link to='/okay'>Playlists</router-link> |
            <router-link to='/music'>Music</router-link>
        </div>
        <div v-else>
            <a href="http://localhost:5000/auth/google/">login</a>
        </div>
        <router-link to='/websocket'>Websocket test</router-link>
        <br>
    </div>
</template>

<script>
export default {
    name: 'navbar',
    data() {
        return {
            login: true
        }
    },
    methods: {
        isLoggedIn() {
            if (localStorage.getItem("jwt"))
                this.login = true
            else
                this.login = false
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