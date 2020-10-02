<template>
  <div>
    <div>
        <a href="http://localhost:5000/users/auth/google/">Google</a> | 
        <!-- <a href="http://localhost:5000/users/auth/deezer-pass/">Deezer (Passport)</a> |  -->
        <a :href="deezer + app_id + redirect_uri">Deezer Oauth</a>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      heroku: 'https://cors-anywhere.herokuapp.com/',
      redirect_uri: '&redirect_uri=http://localhost:5000/users/auth/deezer/redirect',
      deezer: 'https://connect.deezer.com/oauth/auth.php?',
      app_id: 'app_id=437882'
    }
  },
  methods: {
  }
}
</script>
