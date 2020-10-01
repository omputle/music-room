<template>
    <div class="info_bar">
        <h3>profile</h3>
        <p>{{state.User.username}}</p>
        <p>{{state.User.first_name}}</p>
        <p>{{state.User.last_name}}</p>
        <p>{{state.User.email}}</p>
    </div>
</template>

<script>
import { reactive } from 'vue'

export default {
    name: 'Profile',
    props: {
        username: String
    },
    setup(props) {
        const state = reactive({
            User: {
                'username':props.username,
                'first_name':'Kori',
                'last_name':'Sefeane',
                'email':'ksefeane@gmail.com'
            }
        })
        return {
            state
        }
    }
}
</script>
<style scoped>

</style>