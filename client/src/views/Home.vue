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
      async sendUrl() {
          let path = 'http://localhost:5000/auth/url'
          let data = {'url':document.URL}
          axios.post(path, data).catch(e => {console.log(e)})
      },
      async getToken () {
          let t = this.$route.query.t
          let options = {
              method: 'get',
              url: `http://localhost:5000/auth/jwt/${t}`
          }
          axios(options)
          .then(res => {console.log(res.data)})
          .catch(e => {console.log(e)})
      }
  },
  created() {
      this.getToken()
  }
}
</script>
