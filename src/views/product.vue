<template>
  <x-header>
    {{product.name}}
    <div slot="right">
      <i class="fa fa-heart-o"></i>
    </div>
  </x-header>
  <div class="product_header">
    <img :src="product.avatar" />
    <div class="weui_panel">
      <div class="weui_panel_bd">
        <div class="weui_media_box weui_media_text">
          <h4 class="weui_media_title">{{product.name}}</h4>
          <p class="weui_media_desc">
            <rater :value.sync="data42" slot="value" active-color="#04BE02" :font-size=15 disabled></rater>
          </p>
          <ul class="weui_media_info">
              <li class="weui_media_info_meta">销售{{product.orders_by_month_count}}份</li>
              <!--<li class="weui_media_info_meta">时间</li>
              <li class="weui_media_info_meta weui_media_info_meta_extra">其它信息</li>-->
          </ul>
        </div>
        <div class="weui_media_extra">
          <div class="item-pick" :class="{ 'picked': checkSelected(product) }">
            <div class="item-num acenter">{{checkSelected(product)}}</div>
            <div class="item-plus">
              <a class="item-fake-plus fa fa-plus" href="javascript:;" @click="addProduct(product)"></a>
            </div>
            <div class="item-minus">
              <a class="item-fake-minus fa fa-minus" href="javascript:;" @click="removeProduct(product)"></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="weui_panel">
    <div class="weui_panel_hd">美食评价</div>
    <div class="weui_panel_bd">
      <div v-for="comment in product.comments" class="weui_media_box weui_media_text">
        <h4 class="weui_media_title">{{comment.user.nickname}}</h4>
        <p class="weui_media_desc">{{comment.content}}</p>
        <ul class="weui_media_info">
          <li class="weui_media_info_meta">文字来源</li>
          <li class="weui_media_info_meta">{{comment.created_at}}</li>
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
import XHeader from 'vux/components/x-header'
import { showAlert, showLoading, hideLoading, showHandleTip } from '../vuex/actions'

export default {
  vuex: {
    actions: {
      showAlert,
      showLoading,
      hideLoading,
      showHandleTip
    }
  },
  data () {
    return {
      product: {
        comments: []
      },
      selectedProducts: [],
      showCart: false
    }
  },
  route: {
    data (transition) {
      this.showLoading()
      this.$http.get('http://jiancan.me/api/u1/products/one.json', { product_id: this.$route.params.product_id }).then(function (response) {
        this.$set('product', response.data)
        this.loadSelected()
      }, function (response) {
        this.showAlert(response.data.title, response.data.error)
      })
      this.hideLoading()
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
      var index = this.getIndex(product)
      if (index < 0) {
        this.selectedProducts.push({ id: product.id, amount: 1, name: product.name, price: product.price })
      } else {
        this.selectedProducts[index].amount++
      }
      this.saveSelected()
    },
    removeProduct (product) {
      var index = this.getIndex(product)
      if (index >= 0) {
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
    },
    getIndex (product) {
      for (var i = 0; i < this.selectedProducts.length; i++) {
        if (product.id === this.selectedProducts[i].id) {
          return i
        }
      }
      return -1
    }
  },
  events: {
    minus (product) {
      this.removeProduct(product)
    },
    plus (product) {
      this.addProduct(product)
    },
    'show-cart' () {
      this.showCart = !this.showCart
    }
  },
  components: {
    XHeader,
    'ShoppingCart': require('../components/shopping-cart.vue'),
    'ShoppingCartList': require('../components/shopping-cart-list.vue'),
    Rater
  }
}
</script>
