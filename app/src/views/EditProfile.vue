<template>
    <div>
        {{msg}}
        <v-card class="mx-auto mt-5">
            <v-card-title class="headline font-weight-light">Edit Profile</v-card-title>
            <v-card-text>
                <v-form ref="form">
                    <v-text-field
                        v-model="username"
                        label='Username'
                        :rules="rules"
                    ></v-text-field>
                    <v-text-field
                        v-model="first_name"
                        label='First Name'
                        :rules="rules"
                    ></v-text-field>
                    <v-text-field
                        v-model="last_name"
                        label='Last Name'
                        :rules="rules"
                    ></v-text-field>
                </v-form>
            </v-card-text>
            <v-divider></v-divider>
                <v-btn 
                    @click="validate"
                    color="success"
                >
                    Update details
                </v-btn>
        </v-card>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            id: this.$route.params.id,
            profile: '',
            username: '',
            first_name: '',
            last_name: '',
            email: '',
            msg: '',
            rules: [
                value => !!value || 'Required',
            ]
        }
    },
    methods: {
        validate () {
            this.$refs.form.validate()
            if (this.username && this.first_name && this.last_name) {
                let user = this.validate_inputs(this.username)
                let first = this.validate_inputs(this.first_name)
                let last = this.validate_inputs(this.last_name)
                if (user && last && first) {
                    this.update_details()
                } else {
                    this.msg = "check inputs for weird characters"
                }
            }
        },
        validate_inputs(text) {
            var format = /[`^+\-={}*[\];%:"\\|<>/~]/
            if (format.test(text) == true) {
                return 0
            } else {
                return 1
            }
        },
        update_details() {
            axios({
                method: 'post',
                url: 'http://localhost:5000/user/edit-details',
                data: {
                    'username': this.username,
                    'first_name': this.first_name,
                    'last_name': this.last_name,
                    'email': this.email
                },
                headers: {'Authorization': `Bearer ${localStorage.getItem("deez")}`}
            }).then(results => {
                console.log(results)
            }).catch(err => {console.log(err)})
        },
        getProfile() {
            axios({
                method: 'get',
                url: 'http://localhost:5000/user/me',
                headers: {'Authorization': `Bearer ${localStorage.getItem("deez")}`}
            }).then(results => {
                console.log(results)
            }).catch(err => {console.log(err)})
        },
        update() {
            console.log('clicked')
        }
    },
    created() {
        console.log(this.id)
        // this.getProfile()
        this.profile = this.$store.state.user.profile
        console.log(this.profile)
        this.username = this.profile.username
        this.first_name = this.profile.first_name
        this.last_name = this.profile.last_name
        this.email = this.profile.email
    }
}
</script>