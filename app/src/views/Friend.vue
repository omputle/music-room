<template>
    <div>
        {{friend}}
    </div>
</template>

<script>

export default {
    name: 'Friend',
    computed: {
        friend() {
            this.$store.dispatch('user/currentFriend', this.$route.params.friend)
            return this.$store.state.user.friend
        }
    }
}
</script>