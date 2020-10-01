<template>
    <div class="info_bar">
        <h4>profile</h4>
        <p>{{user.username}}</p>
    </div>
</template>

<script>
export default {
    name: 'Profile',
    props: {
        user: Object
    }
}
</script>
<style scoped>

</style>