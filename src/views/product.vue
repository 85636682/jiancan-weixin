<template>
  <navigation-bar :go-back="buildLink">
    <div slot="middle_content">
      {{product.name}}
    </div>
    <div slot="right_items">
      <i class="fa fa-heart-o"></i>
    </div>
  </navigation-bar>
  <div class="product_header">
    <img :src="product.avatar" />
    <div class="product_card">
      <div class="content">
        <a class="header">{{product.name}}</a>
        <div class="meta">
        </div>
        <div class="description">
          <p></p>
        </div>
        <div class="extra">
          <rater :value.sync="data42" slot="value" active-color="#04BE02" :font-size=15 disabled></rater>
        </div>
      </div>
      <div class="buy">
        <button class="button button-action button-circle button-tiny" @click="removeProduct(product)">
          <i class="fa fa-minus"></i>
        </button>
        <span v-show="checkSelected(product)">{{checkSelected(product)}}</span>
        <button class="button button-action button-circle button-tiny add-product" @click="addProduct(product)">
          <i class="fa fa-plus"></i>
        </button>
      </div>
    </div>
  </div>
  <div class="weui_panel">
    <div class="weui_panel_hd">美食评价</div>
    <div class="weui_panel_bd">
      <div class="weui_media_box weui_media_text">
        <h4 class="weui_media_title">标题一</h4>
        <p class="weui_media_desc">由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。</p>
        <ul class="weui_media_info">
          <li class="weui_media_info_meta">文字来源</li>
          <li class="weui_media_info_meta">时间</li>
          <li class="weui_media_info_meta weui_media_info_meta_extra">其它信息</li>
        </ul>
      </div>
    </div>
  </div>
  <shopping-cart-list :show.sync="showCart" :selected-products="selectedProducts"></shopping-cart-list>
  <shopping-cart>
    <span slot="money" style="color: #56abe4;">￥ {{totalPrice}}</span>
  </shopping-cart>
</template>
<script>
import Rater from 'vux/components/rater'

export default {
  data () {
    return {
      product: {},
      selectedProducts: []
    }
  },
  route: {
    data (transition) {
      this.$http.get('http://jiancan.me/api/u1/products/one.json', { product_id: this.$route.params.product_id }).then(function (response) {
        this.$set('product', response.data)
        this.loadSelected()
      }, function (response) {
        this.$dispatch('response-msg', response)
      })
    }
  },
  computed: {
    totalPrice () {
      var money = 0
      for (var i = 0; i < this.selectedProducts.length; i++) {
        money += this.selectedProducts[i].price * this.selectedProducts[i].amount
      }
      return money
    },
    buildLink () {
      return '/shops/' + this.product.shop_id
    }
  },
  methods: {
    saveSelected () {
      localStorage.setItem('jc_' + this.product.shop_id + '_cart', JSON.stringify(this.selectedProducts))
    },
    loadSelected () {
      let cart_datas = localStorage.getItem('jc_' + this.product.shop_id + '_cart')
      if (cart_datas != null) {
        this.selectedProducts = JSON.parse(cart_datas)
      }
    },
    addProduct (product) {
      var index = this.checkSelected(product)
      if (index <= 0) {
        this.selectedProducts.push({ id: product.id, amount: 1, name: product.name, price: product.price })
      } else {
        this.selectedProducts[index].amount++
      }
      this.saveSelected()
    },
    removeProduct (product) {
      var index = this.checkSelected(product)
      if (index > 0) {
        if (this.selectedProducts[index].amount > 1) {
          this.selectedProducts[index].amount--
        } else {
          this.selectedProducts.splice(index, 1)
        }
      }
      this.saveSelected()
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
    }
  },
  components: {
    'NavigationBar': require('../components/navigation-bar.vue'),
    'ShoppingCart': require('../components/shopping-cart.vue'),
    'ShoppingCartList': require('../components/shopping-cart-list.vue'),
    Rater
  }
}
</script>
