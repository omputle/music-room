<template>
  <div>
    <div>
        <a href="http://localhost:5000/auth/google/">Google</a> | 
        <!-- <a href="http://localhost:5000/users/auth/deezer-pass/">Deezer (Passport)</a> |  -->
        <a :href="deezer + app_id + redirect_uri + perms">Deezer Oauth</a>
    </div>
  </div>
</template>

<script>
//import modules
import axios from 'axios'

export default {
    name: 'Home',
    components: {
    },
    data() {
        return {
        heroku: 'https://cors-anywhere.herokuapp.com/',
        redirect_uri: '&redirect_uri=http://localhost:5000/auth/deezer/redirect',
        deezer: 'https://connect.deezer.com/oauth/auth.php?',
        app_id: 'app_id=437882',
        perms: '&perms=basic_access,email,manage_library,manage_community,delete_library'
        }
    },
    methods: {
        verifyUrl() {
            let path = 'http://localhost:5000/auth/jwt'
            let data = {'url':document.URL}
            axios.post(path, data)
            .then(res => {
                //localStorage.setItem("jwt", res.data.token)
                console.log(res.data)
                if (res.data.google) {
                    localStorage.setItem("jwt", res.data.google)
                    window.location.href = this.deezer + this.app_id 
                        + this.redirect_uri + this.perms
                } else if (res.data.deezer) {
                    localStorage.setItem("deez", res.data.deezer)
                    this.$router.push('/user')
                }
            }).catch(e => {console.log(e)})
        }
    },
    created() {
        this.verifyUrl()
    }
}
</script>
