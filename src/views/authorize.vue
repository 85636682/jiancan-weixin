<template>
  <div class="page">
    <div class="weui_msg">
      <div class="weui_icon_area"><i class="weui_icon_msg" v-bind:class="[ successTag ? iconSuccess : iconWarn ]"></i></div>
      <div class="weui_text_area">
        <h2 class="weui_msg_title">{{showMsg}}</h2>
        <p class="weui_msg_desc">{{showExtraMsg}}</p>
      </div>
      <div class="weui_opr_area">
        <p class="weui_btn_area">
          <a @onclick="goRequestUrl" class="weui_btn weui_btn_primary">返回</a>
        </p>
      </div>
      <div class="weui_extra_area">
        <a href="">{{extraMsg}}</a>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        successTag: false,
        iconSuccess: 'weui_icon_success',
        iconWarn: 'weui_icon_warn',
        msg: '',
        extraMsg: '3秒后没发生跳转，请点击上面的按钮'
      }
    },
    computed: {
      isSuccess () {
        return !this.successTag
      },
      showMsg () {
        return this.successTag ? '授权成功' : '授权失败'
      }
    },
    methods: {
      goRequestUrl () {
        var request_url = this.$route.query.request_url
        if (request_url == null || request_url === undefined) {
          request_url = 'profile'
        }
        if (request_url === 'check') {
          self.$route.router.go({ name: request_url, query: { shop_id: self.$route.query.shop_id, express: this.$route.query.express } })
        } else {
          self.$route.router.go({ name: request_url })
        }
      }
    },
    ready () {
      var access_token = this.$route.query.access_token
      if (access_token == null || access_token === undefined) {
        this.successTag = false
      } else {
        this.successTag = true
        localStorage.setItem('jc_user_access_token', access_token)
      }
      var request_url = this.$route.query.request_url
      if (request_url == null || request_url === undefined) {
        request_url = 'profile'
      }
      var self = this
      setTimeout(function () {
        if (request_url === 'check') {
          self.$route.router.go({ name: request_url, params: { shop_id: self.$route.query.shop_id } })
        } else {
          self.$route.router.go({ name: request_url })
        }
      }, 1000 * 1)
    }
  }
</script>
