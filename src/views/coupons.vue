<template>
  <x-header :left-options="leftOptions">有优惠</x-header>
  <div class="weui_tab shop_tab">
    <div class="weui_navbar">
      <div class="weui_navbar_item">
        优惠券
      </div>
      <div class="weui_navbar_item">
        新品上市
      </div>
    </div>
    <div class="weui_tab_bd">
    </div>
  </div>
  <div class="weui_panel weui_panel_access">
    <div class="weui_panel_bd shop_list_bd">
      <a v-for="coupon in coupons" v-link="'/coupon/' + coupon.id" class="weui_media_box weui_media_appmsg">
        <div class="weui_media_hd">
          <img class="weui_media_appmsg_thumb" v-bind:src="coupon.avatar80x80" alt="">
        </div>
        <div class="weui_media_bd">
          <h4 class="weui_media_title">{{coupon.shop.name}}</h4>
          <p class="weui_media_desc" style="font-size:15px;padding-top:5px;white-space: nowrap;text-overflow: ellipsis;">
            {{coupon.details}}
          </p>
          <p class="weui_media_desc" style="font-size:15px;padding-top:5px;">
            <i class="fa fa-clock-o"></i> {{coupon.created_at}}
          </p>
          <p class="weui_media_desc" style="font-size:17px;padding-top:5px;">
            <span style="color:red;">￥{{coupon.original_price}}</span> <small><del>{{coupon.preferential_price}}</del></small>
            <span style="position:absolute;right:10px;font-size:13px;line-height:25px;">共有 {{coupon.coupon_users_count}} 人领取</span>
          </p>
        </div>
      </a>
    </div>
  </div>
  <Tabbar></Tabbar>
</template>
<script>
  import { showAlert, showLoading, hideLoading, showHandleTip } from '../vuex/actions'
  import XHeader from 'vux/components/x-header'

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
        leftOptions: {
          showBack: false,
          backText: 'Back',
          preventGoBack: true
        },
        currentCategory: '今日特价',
        coupons: []
      }
    },
    route: {
      data (transition) {
        this.showLoading()
        this.$http.get('http://jiancan.me/api/u1/coupons.json').then(function (response) {
          this.$set('coupons', response.data)
        }, function (response) {
          this.showAlert(response.data.title, response.data.error)
        })
        this.hideLoading()
      }
    },
    components: {
      XHeader,
      'Tabbar': require('../components/tabbar.vue')
    }
  }
</script>
