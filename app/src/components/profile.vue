<template>
        <div class="panel_item">
            <h4>profile</h4>
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