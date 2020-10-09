<template>
    <div>
        <profile :user="user" />
        <friends :followers="followers" :followings="followings" />
        <settings :settings="settings" />
    </div>
    
</template>

<script>
//import components
import profile from '@/components/profile'
import friends from '@/components/friends'
import settings from '@/components/settings'

//import modules
import axios from 'axios'

export default {
    name: 'User',
    components: {
        profile,
        friends,
        settings
    },
    data() {
        return {
            user: {},
            followers: [],
            followings: [],
            settings: {}
        }
    },
    methods: {
        getProfile() {
            axios({
                method: 'get',
                url: `http://localhost:5000/user/me`,
                headers: {'Authorization': `Bearer ${localStorage.getItem("deez")}`}
            }).then(res => {this.user = res.data})
            .catch(e => {console.log(e)})
        },
        getFriends() {
            axios({
                method: 'get',
                url: `http://localhost:5000/user/friends`,
                headers: {'Authorization': `Bearer ${localStorage.getItem("deez")}`}
            }).then(res => {
                this.followers = res.data.followers,
                this.followings = res.data.followings
            })
            .catch(e => {console.log(e)})
        },
        getSettings() {
            axios({
                method: 'get',
                url: `http://localhost:5000/user/settings`,
                headers: {'Authorization': `Bearer ${localStorage.getItem("deez")}`}
            }).then(r => {this.settings = r.data})
            .catch(e => {console.log(e)})
        }
    },
    created() {
        this.getProfile()
        this.getFriends()
        this.getSettings()
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

