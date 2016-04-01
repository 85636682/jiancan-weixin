<template>
  <navigation-bar :go-back="buildLink">
    <div slot="middle_content">
      订台单
    </div>
  </navigation-bar>
</template>
<script>
  export default {
    props: ['room_id'],
    data () {
      return {
        room: {}
      }
    },
    route: {
      data (transition) {
        var params = this.$route.params
        this.$http.get('http://jiancan.me/api/u1/rooms/one.json', { room_id: params.room_id }).then(function (response) {
          this.$set('room', response.data)
        }, function (response) {
          this.$dispatch('response-msg', response)
        })
      }
    },
    computed: {
      buildLink () {
        return '/rooms/' + this.room.shop_id
      }
    },
    components: {
      'NavigationBar': require('../components/navigation-bar.vue')
    }
  }
</script>
