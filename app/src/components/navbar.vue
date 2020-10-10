<template>
    <div>
        <div v-if="login">
            <button @click="logout">log out</button> |
            <router-link to="/">Home</router-link> | 
            <router-link to="/user">User</router-link> |
            <router-link to="/music">Music</router-link> |
        </div>
        <div v-else>
            <a href="http://localhost:5000/auth/google/">login</a>
        </div>
    </div>
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