<template>
    <div >
        <h4>followers</h4>
        <small v-for="follower in followers" :key="follower.id">
            <p>{{follower.name}}</p>
        </small>
        <h4>following</h4>
        <small v-for="following in followings" :key="following.id">
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