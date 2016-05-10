<template>
  <x-header :left-options="leftOptions">店铺列表</x-header>
  <div class="weui_tab shop_tab">
    <div class="weui_navbar">
      <div class="weui_navbar_item" @click="showCategoryList">
        {{selectedCategoryName}} <i class="fa" :class="[showCategory ? 'fa-angle-down' : 'fa-angle-up']"></i>
      </div>
      <div class="weui_navbar_item" @click="showSortList">
        {{selectedSortName}} <i class="fa" :class="[showSort ? 'fa-angle-down' : 'fa-angle-up']"></i>
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
          <li @click="selectedCategory('all')">
            <img src="../assets/intelligent.png" width="18" style="margin-right:5px;vertical-align:text-bottom" />
            全部分类
          </li>
          <li @click="selectedCategory('breakfast')">
            <img src="../assets/breakfast.png" width="18" style="margin-right:5px;vertical-align:text-bottom" />
            早餐
          </li>
          <li @click="selectedCategory('lunch')">
            <img src="../assets/lunch.png" width="18" style="margin-right:5px;vertical-align:text-bottom" />
            午餐
          </li>
          <li @click="selectedCategory('afternoon_tea')">
            <img src="../assets/afternoon_tea.png" width="18" style="margin-right:5px;vertical-align:text-bottom" />
            下午茶
          </li>
          <li @click="selectedCategory('supper')">
            <img src="../assets/supper.png" width="18" style="margin-right:5px;vertical-align:text-bottom" />
            晚餐
          </li>
          <li @click="selectedCategory('night_snack')">
            <img src="../assets/night_snack.png" width="18" style="margin-right:5px;vertical-align:text-bottom" />
            宵夜
          </li>
        </ul>
      </div>
    </div>
    <div class="category_list_box_item"></div>
    <div class="category_list_box_item"></div>
  </div>

  <div class="sort_list_box">
    <div class="sort_list_box_item"></div>
    <div class="sort_list_box_item">
      <div class="sort_list_bd arrow_box" v-show="showSort">
        <ul>
          <li @click="selectedSort('intelligent')">
            <img src="../assets/intelligent.png" width="18" style="margin-right:5px;vertical-align:text-bottom" />
            智能排序
          </li>
          <li @click="selectedSort('distance')">
            <img src="../assets/distance.png" width="18" style="margin-right:5px;vertical-align:text-bottom" />
            距离最近
          </li>
          <li @click="selectedSort('grade')">
            <img src="../assets/star.png" width="18" style="margin-right:5px;vertical-align:text-bottom" />
            评分最高
          </li>
          <li @click="selectedSort('sales')">
            <img src="../assets/hot.png" width="18" style="margin-right:5px;vertical-align:text-bottom" />
            销量最高
          </li>
          <li @click="selectedSort('capita')">
            <img src="../assets/intelligent.png" width="18" style="margin-right:5px;vertical-align:text-bottom" />
            人均最低
          </li>
        </ul>
      </div>
    </div>
    <div class="sort_list_box_item"></div>
  </div>

  <div class="weui_panel weui_panel_access">
    <div class="weui_panel_hd">{{selectedCategoryName}} | {{selectedSortName}}</div>
    <div class="weui_panel_bd shop_list_bd">
      <a v-for="shop in shops" v-link="'/shops/' + shop.id" class="weui_media_box weui_media_appmsg">
        <div class="weui_media_hd">
          <img class="weui_media_appmsg_thumb" v-bind:src="shop.avatar" alt="">
        </div>
        <div class="weui_media_bd">
          <h4 class="weui_media_title">{{shop.name}}</h4>
          <p class="weui_media_desc" style="font-size:15px;">
            <span style="font-size:13px;margin-right:5px;" v-for="meal in shop.meals">
              <img v-bind:src="'../static/images/'+meal+'.png'" width="15" style="vertical-align:text-bottom" />
              {{ translateMeal(meal) }}
            </span>
          </p>
          <p class="weui_media_desc">
            <rater :value.sync="data42" slot="value" active-color="#04BE02" :font-size=15 disabled></rater>
          </p>
          <p class="weui_media_desc" style="padding-top:5px;">
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
        leftOptions: {
          showBack: false,
          backText: 'Back',
          preventGoBack: true
        },
        shops: [],
        showCategory: false,
        showSort: false,
        selectedCategoryName: '所有分类',
        selectedCategoryOrign: 'all',
        selectedSortName: '排序',
        selectedSortOrign: 'intelligent',
        userLocation: {
          latitude: '',
          longitude: '',
          speed: '',
          accuracy: ''
        }
      }
    },
    route: {
      data (transition) {
        this.$dispatch('show-loading')
        var self = this
        window.wx.getLocation({
          type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: function (res) {
            self.userLocation.latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
            self.userLocation.longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。
            self.userLocation.speed = res.speed // 速度，以米/每秒计
            self.userLocation.accuracy = res.accuracy // 位置精度
            console.log(self.userLocation.latitude)
          }
        })
        this.$http.get('http://jiancan.me/api/u1/shops.json', { }).then(function (response) {
          this.$set('shops', response.data)
        }, function (response) {
          this.$dispatch('response-msg', response)
        })
        this.$dispatch('hide-loading')
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
        this.$dispatch('show-loading')
        this.showCategory = false
        this.selectedCategoryOrign = meal
        this.selectedCategoryName = meal === 'all' ? '所有分类' : this.translateMeal(meal)
        this.$http.get('http://jiancan.me/api/u1/shops.json', { meal: meal, sort: this.selectedSortOrign }).then(function (response) {
          this.$set('shops', response.data)
        }, function (response) {
          this.$dispatch('response-msg', response)
        })
        this.$dispatch('hide-loading')
      },
      selectedSort (sort) {
        this.$dispatch('show-loading')
        this.showSort = false
        this.selectedSortOrigin = sort
        this.selectedSortName = this.translateSort(sort)
        this.$http.get('http://jiancan.me/api/u1/shops.json', { meal: this.selectedCategoryOrign, sort: sort }).then(function (response) {
          this.$set('shops', response.data)
        }, function (response) {
          this.$dispatch('response-msg', response)
        })
        this.$dispatch('hide-loading')
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
      translateSort (sort) {
        var tempSort = ''
        switch (sort) {
          case 'intelligent':
            tempSort = '智能排序'
            break
          case 'distance':
            tempSort = '距离最近'
            break
          case 'grade':
            tempSort = '评分最高'
            break
          case 'sales':
            tempSort = '销量最高'
            break
          case 'capita':
            tempSort = '人均最少'
            break
          default:
            tempSort = ''
        }
        return tempSort
      },
      showCategoryList () {
        this.showCategory = !this.showCategory
      },
      showSortList () {
        this.showSort = !this.showSort
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
