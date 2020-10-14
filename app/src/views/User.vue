<template>
    <div>
        <profile />
    </div>
</template>

<script>
import profile from '@/components/profile'

export default {
    name: 'User',
    components: {
        profile
    },
    data() {
        return {
            friends: [],
            settings: {}
        }
    },
    methods: {
        
    },
    created() {
        this.$store.dispatch('user/getProfile')
        this.$store.dispatch('user/getFriends')
        this.$store.dispatch('user/getSettings')
    }
}
</script>