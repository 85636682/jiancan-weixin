<template>
  <x-header :left-options="leftOptions">订单列表</x-header>
  <div class="weui_tab shop_tab">
    <div class="weui_navbar">
      <div class="weui_navbar_item">
        所有订单
      </div>
      <div class="weui_navbar_item" @click="goToComments">
        待评价
      </div>
      <div class="weui_navbar_item" @click="goToBookings">
        预订单
      </div>
    </div>
    <div class="weui_tab_bd">
    </div>
  </div>
  <div style="height:10px;">
  </div>
  <div class="bd" v-if="isLogged">
    <div class="weui_panel" v-for="order in orders">
      <div class="weui_panel_hd">
        <img src="../assets/iconfont-shop.png" alt="" style="width:20px;vertical-align:middle;">
        <span>{{order.shop.name}}</span>
      </div>
      <div class="weui_panel_bd">
        <div class="weui_media_box weui_media_text">
          <a v-link="{ name: 'order', params: { order_id: order.id } }">
            <h4 class="weui_media_title">{{order.sn}}</h4>
            <div class="weui_uploader_bd">
              <ul class="weui_uploader_files">
                <li v-for="order_product in order.order_products" class="weui_uploader_file" :style="{ backgroundImage: 'url(' + order_product.product.avatar + ')' }" ></li>
              </ul>
            </div>
            <p class="weui_media_desc"></p>
            <ul class="weui_media_info">
              <li class="weui_media_info_meta" style="color:red;">￥ {{order.total_price}}</li>
              <li class="weui_media_info_meta">{{order.created_at}}</li>
              <li class="weui_media_info_meta weui_media_info_meta_extra" style="color:#ea8010;">{{order.status_text}}</li>
            </ul>
          </a>
        </div>
      </div>
    </div>
  </div>
  <Tabbar></Tabbar>
</template>
<script>
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
        leftOptions: {
          showBack: false,
          backText: 'Back',
          preventGoBack: true
        },
        orders: {},
        isLogged: false
      }
    },
    route: {
      data (transition) {
        this.showLoading()
        let access_token = localStorage.getItem('jc_user_access_token')
        if (access_token !== null) {
          this.isLogged = true
          this.$http.get('http://jiancan.me/api/u1/orders.json', { access_token: access_token }).then(function (response) {
            this.$set('orders', response.data)
          }, function (response) {
            this.showAlert(response.data.title, response.data.error)
          })
        }
        this.hideLoading()
      }
    },
    methods: {
      goToBookings () {
        this.$route.router.go({name: 'bookings'})
      },
      goToComments () {
        this.$route.router.go({name: 'mycomments'})
      }
    },
    components: {
      'Tabbar': require('../components/tabbar.vue'),
      XHeader
    }
  }
</script>
