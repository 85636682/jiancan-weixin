<template>
  <x-header>店铺列表</x-header>
  <div class="weui_tab shop_tab">
    <div class="weui_navbar">
      <div class="weui_navbar_item" @click="showCategoryList">
        {{selectedCategoryName}} <i class="fa" :class="[showCategory ? 'fa-long-arrow-down' : 'fa-long-arrow-up']"></i>
      </div>
      <div class="weui_navbar_item" :class="{ 'tab_selected': selectedTab === '评论' }" @click="selectedTab='评论'">
        排序
      </div>
      <div class="weui_navbar_item" :class="{ 'tab_selected': selectedTab === '商家' }" @click="selectedTab='商家'">
        每日特价
      </div>
    </div>
    <div class="weui_tab_bd"></div>
  </div>

  <div class="category_list_box">
    <div class="category_list_box_item">
      <div class="category_list_bd arrow_box" v-show="showCategory">
        <ul>
          <li @click="selectedCategory('all')">全部分类</li>
          <li @click="selectedCategory('breakfast')">早餐</li>
          <li @click="selectedCategory('lunch')">午餐</li>
          <li @click="selectedCategory('afternoon_tea')">下午茶</li>
          <li @click="selectedCategory('supper')">晚餐</li>
          <li @click="selectedCategory('night_snack')">宵夜</li>
        </ul>
      </div>
    </div>
    <div class="category_list_box_item"></div>
    <div class="category_list_box_item"></div>
  </div>

  <div class="weui_panel weui_panel_access">
    <div class="weui_panel_hd">{{selectedCategoryName}}</div>
    <div class="weui_panel_bd shop_list_bd">
      <a v-for="shop in shops" v-link="'/shops/' + shop.id" class="weui_media_box weui_media_appmsg">
        <div class="weui_media_hd">
          <img class="weui_media_appmsg_thumb" v-bind:src="shop.avatar" alt="">
        </div>
        <div class="weui_media_bd">
          <h4 class="weui_media_title">{{shop.name}}</h4>
          <p class="weui_media_desc" style="font-size:15px;">
            <span class="" v-for="meal in shop.meals">
              {{ translateMeal(meal) }}
            </span>
          </p>
          <p class="weui_media_desc">
            <rater :value.sync="data42" slot="value" active-color="#04BE02" :font-size=15 disabled></rater>
          </p>
          <p class="weui_media_desc">
            月售{{shop.orders_by_month_count}}单
          </p>
        </div>
      </a>
    </div>
  </div>
  <Tabbar></Tabbar>
</template>
<script>
  import XHeader from 'vux/components/x-header'
  import Rater from 'vux/components/rater'

  export default {
    data () {
      return {
        shops: [],
        showCategory: false,
        selectedCategoryName: '所有分类'
      }
    },
    route: {
      data (transition) {
        this.$dispatch('show-loading')
        this.$http.get('http://jiancan.me/api/u1/shops.json', { }).then(function (response) {
          this.$set('shops', response.data)
          this.$dispatch('hide-loading')
        }, function (response) {
          this.$dispatch('response-msg', response)
        })
      }
    },
    methods: {
      buildSrc (meal) {
        return '../src/assets/' + meal + '.png'
      },
      buildLink (shopId) {
        return '/shops/' + shopId
      },
      selectedCategory (meal) {
        this.showCategory = false
        this.selectedCategoryName = meal === 'all' ? '所有分类' : this.translateMeal(meal)
        this.$http.get('http://jiancan.me/api/u1/shops.json', { meal: meal }).then(function (response) {
          this.$set('shops', response.data)
        }, function (response) {
          this.$dispatch('response-msg', response)
        })
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
        this.showCategory = !this.showCategory
      }
    },
    components: {
      'Tabbar': require('../components/tabbar.vue'),
      XHeader,
      Rater
    }
  }
</script>
<style lang="scss">
  .avatar {
    width: 80px;
    height: 80px;
    margin-right: 15px;

    img {
      width: 80px;
      height: 80px;
    }
  }
</style>
