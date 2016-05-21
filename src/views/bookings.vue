<template>
  <x-header>订台单</x-header>
  <div class="weui_panel">
    <div class="weui_panel_hd">预定台桌</div>
    <div class="weui_panel_bd">
      <div class="weui_media_box weui_media_text" v-for="booking in bookings">
        <h4 class="weui_media_title">预定台桌：{{booking.bookingable.room.name}}</h4>
        <p class="weui_media_desc">来自：{{booking.shop.name}}</p>
        <ul class="weui_media_info">
          <li class="weui_media_info_meta">预定时间：{{booking.booking_time}}</li>
          <li class="weui_media_info_meta"></li>
          <li class="weui_media_info_meta weui_media_info_meta_extra">{{booking.confirmed_text}}</li>
        </ul>
      </div>
    </div>
  </div>
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
        bookings: []
      }
    },
    route: {
      data (transition) {
        this.showLoading()
        this.$http.get('http://jiancan.me/api/u1/bookings.json', { bookingable_type: 'Room', access_token: localStorage.jc_user_access_token }).then(function (response) {
          this.$set('bookings', response.data)
        }, function (response) {
          this.showAlert(response.data.title, response.data.error)
        })
        this.hideLoading()
      }
    },
    components: {
      XHeader
    }
  }
</script>
