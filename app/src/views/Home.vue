<template>
  <div>
      
  </div>
</template>

<script>
//import axios from 'axios'
import keys from '@/configs/config'
import { post } from '@/functions/api'

export default {
    name: 'Home',
    data() {
        return {
        test: keys.test,
        heroku: 'https://cors-anywhere.herokuapp.com/',
        redirect_uri: '&redirect_uri=http://localhost:5000/auth/deezer/redirect',
        deezer: 'https://connect.deezer.com/oauth/auth.php?',
        app_id: 'app_id=437882',
        perms: '&perms=basic_access,email,manage_library,manage_community,delete_library'
        }
    },
    methods: {
        verifyUrl() {
            post('/auth/jwt', {'url':document.URL})
            .then(res => {
                if (res.data.google) {
                    localStorage.setItem("jwt", res.data.google)
                    let l = keys.deezer
                    window.location.href = l.path+l.app_id+l.redirect_uri+l.perms
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
