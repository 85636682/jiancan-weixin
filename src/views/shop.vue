<template>
  <navigation-bar go-back="/shops">
    <div slot="middle_content">
      {{shop.name}}
    </div>
    <div slot="right_items">
      <i class="fa fa-heart-o" v-bind:class="[isFavorited ? 'fa-heart' : 'fa-heart-o']" @click="favorite"></i>
    </div>
  </navigation-bar>
  <div class="shop_header">
    <div class="shop_card" style="width: 100%;height: 80px;display:-webkit-box;display:-moz-box;">
      <div class="image" style="margin-left:10px;width:70px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;">
        <img v-bind:src="shop.avatar" width="70px" height="70px" />
      </div>
      <div class="content" style="-webkit-box-flex:1;-moz-box-flex:1;-webkit-box-ordinal-group:2;-moz-box-ordinal-group:2;margin:0 5px;">
        <a class="header" style="color:#FFF;">{{shop.name}}</a>
        <div class="meta" style="color:#FFF;">
          <span class="" v-for="meal in shop.meals">
            {{ translateMeal(meal) }}
          </span>
        </div>
        <div class="description" style="color:#FFF;">
          <p></p>
        </div>
        <div class="extra" style="color:#FFF;">
          <rater :value.sync="data42" slot="value" active-color="#04BE02" :font-size=15 disabled></rater>
        </div>
      </div>
    </div>
  </div>
  <div class="weui_tab shop_tab">
    <div class="weui_navbar">
      <div :class="{ 'tab_selected': selectedTab === '分类' }" :class="[showCategory ? 'category_active' : '']" class="weui_navbar_item" @click="showCategoryList">
        {{selectedCategoryName}} <i class="fa" :class="[showCategory ? 'fa-long-arrow-down' : 'fa-long-arrow-up']"></i>
      </div>
      <a class="weui_navbar_item" v-link="'/rooms/' + shop.id" :class="{ 'tab_selected': selectedTab === '评论' }" @click="selectedTab='评论'">
        订台
      </a>
      <div class="weui_navbar_item" :class="{ 'tab_selected': selectedTab === '商家' }" @click="showComments=!showComments">
        评论（{{shop.comments ? shop.comments.length : 0}}）
      </div>
    </div>
    <div class="weui_tab_bd"></div>
  </div>

  <div class="category_list_box">
    <div class="category_list_box_item">
      <div class="category_list_bd arrow_box" v-show="showCategory">
        <ul>
          <li v-for="category in shop.categories" @click="selectedCategory(category)">{{category.name}}</li>
        </ul>
      </div>
    </div>
    <div class="category_list_box_item"></div>
    <div class="category_list_box_item"></div>
  </div>

  <div class="weui_panel weui_panel_access" v-show="showComments">
    <div class="weui_panel_hd">顾客评论</div>
    <div class="weui_panel_bd">
      <div class="weui_media_box weui_media_text" v-for="comment in shop.comments">
        <h4 class="weui_media_title">{{comment.user.nickname}}</h4>
        <p class="weui_media_desc">{{comment.content}}</p>
      </div>
    </div>
    <a v-link="'/comments/' + shop.id" class="weui_panel_ft">查看更多</a>
  </div>

  <product-list :title="currentCategory.name" :products="products" :selected-products="selectedProducts"></product-list>
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
        selectedTab: '中餐菜色',
        shop: {},
        isFavorited: false,
        currentCategory: {},
        products: [],
        selectedProducts: [],
        showCart: false,
        showCategory: false,
        selectedCategoryName: '所有分类',
        showComments: false
      }
    },
    route: {
      data (transition) {
        this.$dispatch('show-loading')
        this.loadSelected()
        var params = this.$route.params
        this.$http.get('http://jiancan.me/api/u1/shops/one.json', { shop_id: params.shop_id }).then(function (response) {
          this.$set('shop', response.data)
          this.$set('currentCategory', this.shop.categories[0] ? this.shop.categories[0] : {})
          this.getProductsByCategory()
          this.$dispatch('hide-loading')
        }, function (response) {
          this.$dispatch('response-msg', response)
        })
        let access_token = localStorage.getItem('jc_user_access_token')
        if (access_token != null) {
          this.$http.get('http://jiancan.me/api/u1/favorites/favorited.json', { shop_id: params.shop_id, access_token: access_token }).then(function (response) {
            this.$set('isFavorited', response.data.isFavorited)
          }, function (response) {
            this.$dispatch('response-msg', response)
          })
        }
      }
    },
    computed: {
      totalPrice () {
        var money = 0
        for (var i = 0; i < this.selectedProducts.length; i++) {
          money += this.selectedProducts[i].price * this.selectedProducts[i].amount
        }
        return money
      }
    },
    methods: {
      buildLink (shopId) {
        return '/shops/' + shopId
      },
      translateMeal (meal) {
        var tempMeal = ''
        switch (meal) {
          case 'breakfast':
            tempMeal = '早餐'
            break
          case 'lunch':
            tempMeal = '午餐'
            break
          case 'afternoon_tea':
            tempMeal = '下午茶'
            break
          case 'supper':
            tempMeal = '晚餐'
            break
          case 'night_snack':
            tempMeal = '宵夜'
            break
          default:
            tempMeal = ''
        }
        return tempMeal
      },
      showCategoryList () {
        this.selectedTab = ''
        this.showCategory = !this.showCategory
      },
      selectedCategory (item) {
        this.selectedCategoryName = item.name
        this.showCategory = false
        this.$set('currentCategory', item)
        this.getProductsByCategory()
      },
      getProductsByCategory () {
        this.$http.get('http://jiancan.me/api/u1/categories/products.json', { category_id: this.currentCategory.id }).then(function (response) {
          this.$set('products', response.data)
        }, function (response) {
          this.$dispatch('response-msg', response)
        })
      },
      checkSelected (product) {
        for (var i = 0; i < this.selectedProducts.length; i++) {
          if (product.id === this.selectedProducts[i].id) {
            return i
          }
        }
        return -1
      },
      saveSelected () {
        localStorage.setItem('jc_' + this.shop.id + '_cart', JSON.stringify(this.selectedProducts))
      },
      loadSelected () {
        let cart_datas = localStorage.getItem('jc_' + this.$route.params.shop_id + '_cart')
        if (cart_datas != null) {
          this.selectedProducts = JSON.parse(cart_datas)
        }
      },
      addProduct (product) {
        var index = this.checkSelected(product)
        if (index < 0) {
          this.selectedProducts.push({ id: product.id, amount: 1, name: product.name, price: product.price })
        } else {
          this.selectedProducts[index].amount++
        }
        this.saveSelected()
      },
      removeProduct (product) {
        var index = this.checkSelected(product)
        if (index >= 0) {
          if (this.selectedProducts[index].amount > 1) {
            this.selectedProducts[index].amount--
          } else {
            this.selectedProducts.splice(index, 1)
          }
        }
        this.saveSelected()
      },
      favorite () {
        let access_token = localStorage.getItem('jc_user_access_token')
        if (access_token != null) {
          this.$http.post('http://jiancan.me/api/u1/favorites/shops.json', { shop_id: this.shop.id, access_token: access_token }).then(function (response) {
            this.$set('isFavorited', response.data.isFavorited)
          }, function (response) {
            this.$dispatch('response-msg', response)
          })
        }
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
      },
      'go-check' () {
        if (this.selectedProducts.length > 0) {
          this.$route.router.go({name: 'check', query: { shop_id: this.shop.id, express: this.shop.full_free_courier }})
        }
      }
    },
    components: {
      'NavigationBar': require('../components/navigation-bar.vue'),
      'ShoppingCart': require('../components/shopping-cart.vue'),
      'ShoppingCartList': require('../components/shopping-cart-list.vue'),
      'product-list': require('../components/product/list.vue'),
      Rater
    }
  }
</script>
<style lang="scss">
@import '~vux/vux.css';
</style>
