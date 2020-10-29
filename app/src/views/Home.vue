<template>
  <div>
    <v-carousel
    cycle
    hide-delimiters
    >
        <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
        ></v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import keys from '@/configs/config'
import { post } from '@/functions/api'

export default {
    name: 'Home',
    components: {
    },
    data () {
      return {
        items: [
          {
            src: 'https://wallpapercave.com/wp/wp2587741.png',
          },
          {
            src: 'https://images6.alphacoders.com/417/thumb-1920-417448.jpg',
          },
          {
            src: 'https://www.chromethemer.com/download/hd-wallpapers/chimp-music-3840x2160.jpg',
          },
        ],
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
<style scoped>
.test {
    height: auto;
    width: 100%;
}
</style>