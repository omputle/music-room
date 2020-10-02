<template>
  <div>
      <h3>Home</h3>
      <small><a :href="oauth">login (google)</a></small>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  },
  data() {
      return {
          oauth: 'http://localhost:5000/users/auth/google'
      }
  }
}
</script>
