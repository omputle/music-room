<template>
    <div>
        <h2>user account</h2>
        <profile :username="'ksefeane'" />
        <playlists :username="'ksefeane'" />
        <friends :username="'ksefeane'" />
        <settings :username="'ksefeane'" />
    </div>
</template>

<script>
//import components
import profile from '@/components/profile'
import playlists from '@/components/playlists'
import friends from '@/components/friends'
import settings from '@/components/settings'

//import modules

export default {
    components: {
        profile,
        playlists,
        friends,
        settings
    },
    Setup() {}
}
</script>

