<template>
        <div class="profile_panel">
            <h3>profile</h3>
            <p>{{user.username}}</p>
            <p>{{user.first_name}}</p>
            <p>{{user.last_name}}</p>
            <p>{{user.email}}</p>
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

.profile_panel {
    display: flex;
    flex-direction: column;
    margin-right: 20px;
    padding: 10px;
    background-color: navajowhite;
    border-radius: 5px;
    border: 1px solid grey;
}

</style>