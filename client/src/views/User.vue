<template>
    <div class="profile">
        <profile :user="user" />
        <!-- <div>
            <playlists :username="username" />
            <friends :username="username" />
            <settings :username="username" />
        </div> -->
    </div>
    
</template>

<script>
//import components
import profile from '@/components/profile'
// import playlists from '@/components/playlists'
// import friends from '@/components/friends'
// import settings from '@/components/settings'

//import modules
import axios from 'axios'
import jwt from 'njwt'

export default {
    name: 'User',
    components: {
        profile
        // playlists,
        // friends,
        // settings
    },
    data() {
        return {
            user: {}
        }
    },
    methods: {
        getProfile() {
            let token = localStorage.getItem("deez")
            let username = localStorage.getItem("jwt")
            username = jwt.verify(username, 'edswhateds')
            let options = {
                method: 'get',
                url: `http://localhost:5000/user/me`,
                headers: {'Authorization': `Bearer ${token}`}
            }
            axios(options)
            .then(res => {
                console.log(res.data)
                this.user = res.data
                this.user.username = username.body.name
            })
            .catch(e => {console.log(e)})
        }
    },
    created() {
        this.getProfile()
    }
}
</script>

<style scoped>
.profile {
    display: grid;
    grid-template-columns: 1fr 3fr;
    width: 100%;
    padding: 10px;
    background-color: inherit;
}

</style>

