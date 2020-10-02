<template>
        <div class="profile_panel">
            <h3>profile</h3>
            <p>{{User.username}}</p>
            <p>{{User.first_name}}</p>
            <p>{{User.last_name}}</p>
            <p>{{User.email}}</p>
        </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Profile',
    props: {
        username: String
    },
    data() {
        return {
            User:{
                'username': this.username
            }
        }
    },
    methods: {
        async getProfile() {
            let path = `http://localhost:5000/users/${this.username}`
            let pro = await axios.get(path)
            .catch(e => {console.log(e)})
            pro.data ? this.User = pro.data : 0
        }
    },
    created() {
        this.getProfile()
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