<template>
    <div>
        <router-link to="/user">Back</router-link>
        <div v-for="user in users" :key="user.user_id">
            <div v-if="user.user_id != my_id">
                {{user.username}}
                <v-btn @click="follow(user.user_id)">Follow</v-btn> | 
                <v-btn @click="unfollow(user.user_id)">Unfollow</v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            users: [],
            my_id: '',
            following: [],
            not_following: []
        }
    },
    methods: {
        fetch_users() {
            axios({
                method: 'get',
                url: 'http://localhost:5000/user/get-users',
                headers: {'Authorization': `Bearer ${localStorage.getItem("deez")}`}
            }).then((results) => {
                console.log(results)
                this.users = results.data
            }).catch((err) => {
                console.log(err)
            })
        },
        fetch_followers() {
            axios({
                method: 'get',
                url: 'http://localhost:5000/user/friends',
                headers: {'Authorization': `Bearer ${localStorage.getItem("deez")}`}
            }).then((results) => {
                console.log(results)
                this.following = this.following_ids(results.data.followings)
            }).catch((err) => {
                console.log(err)
            })
        },
        following_ids(friends) {
            let following_peeps = []
            for (let index = 0; index < friends.length; index++) {
                following_peeps.push(friends[index].id)
            }
            return following_peeps
        },
        follow(user_id) {
            console.log(user_id)
            axios({
                method: 'post',
                data: {
                    'user_id': user_id
                },
                url: 'http://localhost:5000/user/follow-user',
                headers: {'Authorization': `Bearer ${localStorage.getItem("deez")}`}
            }).then(results => {
                console.log(results)
                this.fetch_followers()
            }).catch(err => {
                console.log(err)
            })
        },
        unfollow(user_id) {
            axios({
                method: 'post',
                data: {
                    'user_id': user_id
                },
                url: 'http://localhost:5000/user/unfollow-user',
                headers: {'Authorization': `Bearer ${localStorage.getItem("deez")}`}
            }).then(results => {
                console.log(results)
                this.fetch_followers()
                if (results.data === true) {
                    this.following = this.following.filter(function(item) {
                        return item !== user_id
                    })
                }
            }).catch(err => {
                console.log(err)
            })
        }
    },
    created() {
        this.fetch_users()
        this.my_id = this.$store.state.user.profile.id
        this.fetch_followers()
    }
}
</script>