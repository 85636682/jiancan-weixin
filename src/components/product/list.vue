<template>
  <div class="weui_panel">
    <div class="weui_panel_hd">{{title}}</div>
    <div class="weui_panel_bd product_list_bd">
      <div v-for="product in products" class="weui_media_box weui_media_appmsg">
        <img v-if="product.recommend" src="../../assets/recommend-1.png" style="position: absolute;top:0px;right:0px;width:30px;" />
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
            销售{{product.orders_by_month_count}}份
          </p>
        </div>
        <div class="weui_media_extra">
          <button class="button button-action button-circle button-tiny" @click="minus(product)">
            <i class="fa fa-minus"></i>
          </button>
          <span v-show="checkSelected(product)">{{checkSelected(product)}}</span>
          <button class="button button-action button-circle button-tiny add-product" @click="plus(product, $event)">
            <i class="fa fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Rater from 'vux/components/rater'

  export default {
    props: ['title', 'products', 'selectedProducts'],
    methods: {
      minus (product) {
        this.$dispatch('minus', product)
      },
      plus (product, event) {
        this.$dispatch('plus', product)
      },
      checkSelected (product) {
        if (!this.selectedProducts) {
          return 0
        }
        for (var i = 0; i < this.selectedProducts.length; i++) {
          if (product.id === this.selectedProducts[i].id) {
            return this.selectedProducts[i].amount
          }
        }
        return 0
      },
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
