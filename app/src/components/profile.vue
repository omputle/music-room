<template>
    <div>
        <v-card max-width="800" class="mx-auto">
            <v-app-bar dark>
                <v-spacer></v-spacer>
                <v-toolbar-title class="headline font-weight-light">profile</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-dialog v-model="edit" width="500">
                    <template v-slot:activator="{ on }">
                        <v-icon v-on="on">mdi-account-edit</v-icon>
                    </template>
                    <v-card>
                        <v-card-title class="headline font-weight-light">edit profile</v-card-title>
                        <v-card-text>
                            <form ref="form">
                                <v-text-field v-model="first_name" label="first name"></v-text-field>
                                <v-text-field v-model="last_name" label="last name"></v-text-field>
                                <v-card-actions>
                                    {{msg}}
                                <v-spacer></v-spacer>
                                    <v-btn text @click="submit">submit</v-btn>
                                </v-card-actions>
                            </form>
                        </v-card-text>
                        
                    </v-card>
                </v-dialog>
            </v-app-bar>
            
            <v-sheet id="scrolling-techniques-7" class="overflow-y-auto" max-height="800">
                <v-container style="max-height: 400px">
                    <v-list-item-avatar class="ma-3" size="125">
                        <v-img :src="user.img"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-title v-text="user.username"></v-list-item-title>
                    <v-list-item-title v-text="user.first_name"></v-list-item-title>
                    <v-list-item-title v-text="user.last_name"></v-list-item-title>
                    <v-list-item-title v-text="user.email"></v-list-item-title>
                </v-container>
            </v-sheet>
        </v-card>
        <v-card max-width="800" class="mx-auto overflow-hidden">
            <v-app-bar dark elevate-on-scroll scroll-target="#scrolling-techniques-7">
                <v-spacer></v-spacer>
                <v-toolbar-title class="headline font-weight-light">friends</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-dialog v-model="people" width="500">
                    <template v-slot:activator="{ on }">
                        <v-icon v-on="on">mdi-account-multiple</v-icon>
                    </template>
                    <v-card>
                        <v-card-title class="headline font-weight-light">follow users</v-card-title>
                        <v-container style="max-height: 600px">
                            <v-list-item v-for="f in accounts" :key="f.id">
                                <v-list-item-avatar>
                                    <v-img :src="f.pro_pic"></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title v-text="f.username"></v-list-item-title>
                                </v-list-item-content>
                                <v-btn text @click="follow(f.user_id)"><v-icon>mdi-account-plus</v-icon></v-btn>
                            </v-list-item>
                        </v-container>
                    </v-card>
                </v-dialog>
            </v-app-bar>
            <v-sheet id="scrolling-techniques-7" class="overflow-y-auto" max-height="800">
                <v-container style="max-height: 600px">
                    <v-list>
                        <v-list-group v-for="(item, index) in friends" :key="index" no-action>
                            <template v-slot:activator>
                                <v-list-item-content>
                                    <v-list-item-title v-text="item.title"></v-list-item-title>
                                </v-list-item-content>
                            </template>
                            <v-list-item v-for="f in item.friends" :key="f.id">
                                <v-list-item-avatar>
                                    <v-img :src="f.picture"></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title @click="currentFriend(f)">
                                        <router-link :to="{path: f.name}"  class="text-decoration-none black--text">
                                            {{f.name}}
                                        </router-link>
                                    </v-list-item-title>
                                </v-list-item-content>
                                    <v-btn v-if="item.title === 'following'" text @click="unfollow(f.id)"><v-icon>mdi-account-minus</v-icon></v-btn>
                            </v-list-item>
                        </v-list-group>
                    </v-list>
                </v-container>
            </v-sheet>
        </v-card>
        <v-card max-width="800" class="mx-auto">
            <v-app-bar dark>
                <v-spacer></v-spacer>
                <v-toolbar-title class="headline font-weight-light">settings</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-app-bar>
            <v-sheet id="scrolling-techniques-7" class="overflow-y-auto" max-height="800">
                <v-container style="max-height: 400px">
                    <v-list>
                        <v-list-item v-for="(u, index) in settings" :key="index">
                            <v-list-item-content>
                                <v-list-item-title v-text="u"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-container>
            </v-sheet>
        </v-card>
    </div>
</template>

<script>

export default {
    name: 'Profile',
    data() {
        return {
            people: false,
            edit: false,
            first_name: '',
            last_name: '',
            msg: '',
            rules: [
                value => !!value || 'Required'
            ]
        }
    },
    computed: {
        user() {
            this.openSocket(this.$store.state.user.profile.username)
            return this.$store.state.user.profile
        },
        accounts() {
            return this.$store.state.user.localUsers},
        friends() {return this.$store.state.user.friends},
        settings() {return this.$store.state.user.settings}
    },
    methods: {
        currentFriend(friend) {this.$store.dispatch('user/currentFriend', friend)},
        submit() {
            //this.$refs.form.submit()
            if (this.first_name || this.last_name) {
                this.edit = false
                let first = this.validate_inputs(this.first_name)
                let last = this.validate_inputs(this.last_name)
                if (last && first) {
                    this.editProfile()
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
        editProfile() {
            this.$store.dispatch('user/editProfile', {
                "first_name": this.first_name,
                "last_name":this.last_name,
                "id":this.$store.state.user.profile.id
            })
        },
        follow(fid) {
            this.$store.dispatch('user/follow', {'user_id':fid})
        },
        unfollow(fid) {
            this.$store.dispatch('user/unfollow', {'user_id':fid})
        }
    },
    created() {
        this.$store.dispatch('user/getUsers')
    },
}
</script>