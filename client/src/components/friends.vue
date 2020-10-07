<template>
    <div class="panel_item">
        <h4>followers</h4>
        <small v-for="(follower, index) in followers" :key="index">
            <p>{{follower.name}}</p>
        </small>
        <h4>following</h4>
        <small v-for="(following, index) in followings" :key="index">
            <p>{{following.name}}</p>
        </small>
    </div>
</template>

<script>

export default {
    name: 'Friends',
    props: {
        followers: Array,
        followings: Array
    }
}
</script>
<style scoped>

</style>