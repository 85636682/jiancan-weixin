<template>
  <x-header>我的优惠劵</x-header>
  <div class="weui_msg" v-if="coupon_users.length <= 0">
    <div class="weui_icon_area"><i class="weui_icon_success weui_icon_msg"></i></div>
    <div class="weui_text_area">
      <h2 class="weui_msg_title">没有优惠劵</h2>
      <p class="weui_msg_desc">你没有领取过优惠劵，或已使用</p>
    </div>
  </div>
  <!--BEGIN dialog2-->
  <div class="weui_dialog_alert" v-show="showQRCode">
    <div class="weui_mask"></div>
    <div class="weui_dialog">
      <div class="weui_dialog_hd"><strong class="weui_dialog_title">{{title}}</strong></div>
      <div class="weui_dialog_bd">
        <span style="color:red;">{{random_code}}</span>
        <div style="height:10px;"></div>
        <qrcode :val="random_code"></qrcode>
      </div>
      <div class="weui_dialog_ft">
        <a href="javascript:;" @click="showQRCode = false" class="weui_btn_dialog primary">关闭</a>
      </div>
    </div>
  </div>
  <!--END dialog2-->
  <div class="weui_panel weui_panel_access">
    <div class="weui_panel_bd shop_list_bd">
      <a v-for="coupon_user in coupon_users" @click="useCoupon(coupon_user)" class="weui_media_box weui_media_appmsg">
        <img v-if="coupon_user.used" src="../../assets/used.png" style="position: absolute;top:0px;right:0px;width:80px;" />
        <div class="weui_media_hd">
          <img class="weui_media_appmsg_thumb" v-bind:src="coupon_user.coupon.avatar80x80" alt="">
        </div>
        <div class="weui_media_bd">
          <h4 class="weui_media_title">{{coupon_user.coupon.shop.name}}</h4>
          <p class="weui_media_desc" style="font-size:15px;padding-top:5px;white-space: nowrap;text-overflow: ellipsis;">
            {{coupon_user.coupon.details}}
          </p>
          <p class="weui_media_desc" style="font-size:15px;padding-top:5px;">
            <i class="fa fa-clock-o"></i> {{coupon_user.coupon.created_at}}
          </p>
          <p class="weui_media_desc" style="font-size:17px;padding-top:5px;">
            <span style="color:red;">￥{{coupon_user.coupon.original_price}}</span> <small><del>{{coupon_user.coupon.preferential_price}}</del></small>
            <span style="position:absolute;right:10px;font-size:13px;line-height:25px;">共有 {{coupon_user.coupon.coupon_users_count}} 人领取</span>
          </p>
        </div>
      </a>
    </div>
  </div>
</template>
<script>
  import XHeader from 'vux/components/x-header'
  import qrcode from 'vue-qrcode/dist/vue-qrcode'

  export default {
    data () {
      return {
        showQRCode: false,
        title: '',
        random_code: '',
        coupon_users: []
      }
    },
    route: {
      data (transition) {
        this.$dispatch('show-loading')
        let access_token = localStorage.getItem('jc_user_access_token')
        if (access_token !== null) {
          this.$http.get('http://jiancan.me/api/u1/users/coupon_users.json', { access_token: access_token }).then(function (response) {
            this.$set('coupon_users', response.data)
          }, function (response) {
            this.$dispatch('response-msg', response)
          })
        }
        this.$dispatch('hide-loading')
      }
    },
    methods: {
      useCoupon (coupon_user) {
        if (coupon_user.used) {
          return
        }
        this.title = coupon_user.coupon.title
        this.random_code = coupon_user.random_code
        this.showQRCode = true
      }
    },
    components: {
      XHeader,
      qrcode
    }
  }
</script>
