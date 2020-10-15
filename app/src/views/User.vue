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
    created() {
        this.$store.dispatch('user/getProfile')
        this.$store.dispatch('user/getFriends')
        this.$store.dispatch('user/getSettings')
        this.$store.dispatch('music/getPlaylists')
    }
}
</script>