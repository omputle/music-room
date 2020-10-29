<template>
  <div>
  </div>
</template>

<script>
import keys from '@/configs/config'
import { post } from '@/functions/api'

export default {
    name: 'Home',
    components: {
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
