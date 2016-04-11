<template>
  <div class="weui_panel">
    <div class="weui_panel_hd">{{title}}</div>
    <div class="weui_panel_bd product_list_bd">
      <div v-for="product in products" class="weui_media_box weui_media_appmsg">
        <div class="weui_media_hd" @click="goToProductPage(product)">
          <img class="weui_media_appmsg_thumb" v-bind:src="product.avatar80x80" alt="">
        </div>
        <div class="weui_media_bd" @click="goToProductPage(product)">
          <h4 class="weui_media_title">{{product.name}}</h4>
          <p class="weui_media_desc">
            <rater :value.sync="data42" slot="value" active-color="#04BE02" :font-size=15 disabled></rater>
          </p>
          <h3 class="weui_media_title" style="color: red;">￥ {{product.price}}</h3>
          <p class="weui_media_desc">
            销售{{}}份
          </p>
        </div>
        <div class="weui_media_extra">
          
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Rater from 'vux/components/rater'

  export default {
    props: ['title', 'products'],
    methods: {
      goToProductPage (product) {
        this.$route.router.go({name: 'product', params: { product_id: product.id }})
      }
    },
    components: {
      Rater
    }
  }
</script>
<style lang="scss">

</style>
