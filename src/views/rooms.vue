<template>
  <x-header>选择台号</x-header>
  <div class="weui_grids">
    <a class="weui_grid js_grid" v-for="room in rooms" v-link="'/booking/' + room.id">
      <div class="weui_grid_icon">
        <img src="../assets/supper.png" alt="">
      </div>
      <p class="weui_grid_label">
        {{room.name}}（{{room.seat}}人）
      </p>
    </a>
  </div>
</template>
<script>
import XHeader from 'vux/components/x-header'

export default {
  props: ['shop_id'],
  data () {
    return {
      shop: {},
      rooms: []
    }
  },
  route: {
    data (transition) {
      this.$dispatch('show-loading')
      var params = this.$route.params
      this.$http.get('http://jiancan.me/api/u1/shops/one.json', { shop_id: params.shop_id }).then(function (response) {
        this.$set('shop', response.data)
        this.$set('rooms', this.shop.rooms)
        this.$dispatch('hide-loading')
      }, function (response) {
        this.$dispatch('response-msg', response)
      })
    }
  },
  computed: {
    buildLink () {
      return '/shops/' + this.shop.id
    }
  },
  components: {
    XHeader
  }
}
</script>
