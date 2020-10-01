<template>
    <div>
        <h2>user account</h2>
        <profile :user="{'username':'ksefeane'}"/>
        <!-- <p>profile(details)</p>
        <p>playlists</p>
        <p>friends</p>
        <p>settings(devices,access rights)</p> -->
    </div>
</template>

<script>
//import components
import profile from '@/components/profile'

//import modules

export default {
    components: {
        profile
    }
    
}
</script>

