<template>
    <div>
        <profile :user="user" />
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
            user: {}
        }
    },
    methods: {
        getProfile() {
            get('/user/me').then(res => {this.user = res.data})
            .catch(e => {console.log(e)})
        }
    },
    created() {
        this.getProfile()
    }
}
</script>