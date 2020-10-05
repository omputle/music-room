<template>
    <div class="profile">
        <profile :username="username" />
        <div>
            <playlists :username="username" />
            <friends :username="username" />
            <settings :username="username" />
        </div>
    </div>
    
</template>

<script>
//import components
import profile from '@/components/profile'
import playlists from '@/components/playlists'
import friends from '@/components/friends'
import settings from '@/components/settings'

//import modules
import { useRoute } from 'vue-router'
import axios from 'axios'

export default {
    name: 'User',
    components: {
        profile,
        playlists,
        friends,
        settings
    },
    data() {
        return {
            username:''
        }
    },
    methods: {
        setUsername() {
            this.username = useRoute().params.user
            console.log(this.username)
        },
        async getDeezerProfile() {
            var cors = 'https://cors-anywhere.herokuapp.com'
            var deez = 'https://api.deezer.com/user/me'
            var token = 'frlfrPrR43RAgn7ZDLGG8OtPfmAd7kjrA9OHTwy5sLT6cxoJ6Xi'
            let res = await axios.get(`${cors}/${deez}?access_token=${token}`)
            .catch(e => {console.log(e)})
            console.log(res.data)
        }
    },
    created() {
        this.setUsername()
        this.getDeezerProfile()
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

