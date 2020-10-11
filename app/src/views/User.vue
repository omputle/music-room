<template>
    <div>
        <profile :user="user" />
        <friends :followers="followers" :followings="followings" />
        <settings :settings="settings" />
        <settings :settings="settings" />
    </div>
</template>

<script>
import profile from '@/components/profile'
import friends from '@/components/friends'
import settings from '@/components/settings'

import { get } from '@/functions/api'

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
            get('/user/me').then(res => {this.user = res.data})
            .catch(e => {console.log(e)})
        },
        getFriends() {
            get('/user/friends').then(res => {
                this.followers = res.data.followers
                this.followings = res.data.followings
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