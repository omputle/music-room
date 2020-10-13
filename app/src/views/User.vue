<template>
    <div>
        <profile :user="user" :friends="friends" :settings="settings" />
    </div>
</template>

<script>
import profile from '@/components/profile'

import { get } from '@/functions/api'

export default {
    name: 'User',
    components: {
        profile
    },
    data() {
        return {
            user: {},
            friends: [],
            settings: {}
        }
    },
    methods: {
        getProfile() {
            get('/user/me').then(res => {this.user = res.data})
            .catch(e => {console.log(e)})
        },
        getFriends() {
            get('/user/friends').then(res => {
                this.friends = [
                    {'title':'followers', 'friends':res.data.followers},
                    {'title':'following', 'friends':res.data.followings}
                ]
            }).catch(e => {console.log(e)})
        },
        getSettings() {
            get('/user/settings').then(res => {this.settings = res.data})
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