<template>
  <div class="weui_panel">
    <div class="weui_panel_hd">{{title}}</div>
    <div class="weui_panel_bd product_list_bd">
      <div v-for="product in products" class="weui_media_box weui_media_appmsg">
        <img v-if="product.recommend" src="../../assets/recommend-1.png" style="position: absolute;top:0px;right:0px;width:30px;" />
        <div class="weui_media_hd" @click="goToProductPage(product)">
          <img class="weui_media_appmsg_thumb" :src="product.avatar80x80" alt="">
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
          <div class="item-pick" :class="{ 'picked': checkSelected(product) }">
            <div class="item-num acenter">{{checkSelected(product)}}</div>
            <div class="item-plus">
              <a class="item-fake-plus fa fa-plus" href="javascript:;" @click="plus(product, $event)"></a>
            </div>
            <div class="item-minus">
              <a class="item-fake-minus fa fa-minus" href="javascript:;" @click="minus(product)"></a>
            </div>
          </div>
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
.item-pick {
  width: 32px;
  height: 32px;
  position: absolute;
  right: 15px; top: 50%;
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  border-radius: 40px;
  border: 1px solid #b9b9b9;
  box-sizing: border-box;
  -moz-transition: width 400ms;
  -o-transition: width 400ms;
  -webkit-transition: width 400ms;
  transition: width 400ms;
  text-align: center;
  line-height: 32px;
}
.item-pick .item-num { display: none; }
.item-pick .item-num {
  font-size: 15px;
  color: #df6448;
  opacity: 0;
  -moz-transition: opacity 600ms;
  -o-transition: opacity 600ms;
  -webkit-transition: opacity 600ms;
  transition: opacity 600ms;
}
.item-pick .acenter {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
}
.item-pick .item-minus { display: none; }
.item-pick.picked { width: 103px; }
.item-pick.picked .item-num { display: inherit; opacity: 1; }
.item-pick.picked .item-minus { display: inherit; }

.item-pick .item-plus, .item-pick .item-minus { width: 32px; height: 32px; position: absolute; top: 0px; }
.item-pick .item-plus { right: -1px; }
.item-pick .item-minus { left: -1px; }
.item-pick .item-fake-plus, .item-pick .item-fake-minus { width: 180%; height: 200%; color: #b9b9b9; display: block; position: absolute; top: -50%; right: -40%; line-height: 64px; text-align: center; }
.item-pick .item-fake-plus:active, .item-pick .item-fake-minus:active { color: #df6448; }
</style>
