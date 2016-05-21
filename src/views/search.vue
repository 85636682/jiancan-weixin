<template>
  <x-header>搜索</x-header>
  <div class="weui_search_bar">
    <form @submit="searchForShops" class="weui_search_outer">
      <div class="weui_search_inner">
        <i class="weui_icon_search"></i>
        <input type="search" v-model="searchName" class="weui_search_input" placeholder="搜索" required/>
        <a href="javascript:" class="weui_icon_clear"></a>
      </div>
    </form>
    <a href="javascript:" class="weui_search_cancel">取消</a>
  </div>
  <div class="weui_panel weui_panel_access" v-if="shops.length > 0">
    <div class="weui_panel_hd">搜索结果</div>
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
</template>
<script>
  import XHeader from 'vux/components/x-header'
  import Rater from 'vux/components/rater'
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
        searchName: '',
        shops: []
      }
    },
    route: {
      data (transition) {
      }
    },
    methods: {
      searchForShops (e) {
        e.preventDefault()
        this.showLoading()
        this.$http.get('http://jiancan.me/api/u1/shops/search.json', { name: this.searchName }).then(function (response) {
          this.$set('shops', response.data)
          this.$set('searchName', '')
        }, function (response) {
          this.showAlert(response.data.title, response.data.error)
        })
        this.hideLoading()
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
      }
    },
    components: {
      XHeader,
      Rater
    }
  }
</script>
