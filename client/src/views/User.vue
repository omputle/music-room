<template>
    <div class="profile">
        <profile :user="user" />
        <div>
            <!-- <playlists /> -->
            <friends :followers="followers" :followings="followings" />
            <settings />
        </div>
    </div>
    
</template>

<script>
//import components
import profile from '@/components/profile'
//import playlists from '@/components/playlists'
import friends from '@/components/friends'
import settings from '@/components/settings'

//import modules
import axios from 'axios'
//import jwt from 'njwt'

export default {
    name: 'User',
    components: {
        profile,
        //playlists,
        friends,
        settings
    },
    data() {
        return {
            user: {},
            followers: [],
            followings: []
        }
    },
    methods: {
        getProfile() {
            axios({
                method: 'get',
                url: `http://localhost:5000/user/me`,
                headers: {'Authorization': `Bearer ${localStorage.getItem("deez")}`}
            })
            .then(res => {this.user = res.data})
            .catch(e => {console.log(e)})
        },
        getFriends() {
            axios({
                method: 'get',
                url: `http://localhost:5000/user/followers`,
                headers: {'Authorization': `Bearer ${localStorage.getItem("deez")}`}
            }).then(res => {
                this.followers = res.data.followers,
                this.followings = res.data.followings
            })
            .catch(e => {console.log(e)})
        }
    },
    created() {
        this.getProfile()
        this.getFriends()
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

