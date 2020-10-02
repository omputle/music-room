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
        }
    },
    created() {
        this.setUsername()
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

