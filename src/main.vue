<template>
  <div id="main">
    <router-view></router-view>
    <show-alert :show.sync="showAlert" :error="error"></show-alert>
    <tip-toast :show="showTip"></tip-toast>
    <loading-toast :show="showLoading"></loading-toast>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        showAlert: false,
        showTip: false,
        showLoading: false,
        error: {
          title: '',
          msg: '',
          status: 200,
          statusText: ''
        }
      }
    },
    events: {
      'response-msg' (response) {
        if (response.status === 401) {
          this.showAlert = true
          this.error.title = '请先登录'
          this.error.msg = '你还未授权登录或者验证过期！'
          this.error.status = response.status
          this.error.statusText = response.statusText
          localStorage.setItem('jc_user_access_token', '')
        } else if (response.status === 0) {
          this.showAlert = true
          this.error.title = '网络错误'
          this.error.msg = '似乎已断开与互联网的连接！'
          this.error.status = response.status
          this.error.statusText = response.statusText
        } else {
          this.showAlert = true
          this.error.title = response.statusText
          this.error.msg = response.data.error
          this.error.status = response.status
          this.error.statusText = response.statusText
        }
      },
      'show-alert' (errors) {
        this.showAlert = true
        this.error.title = errors.title
        this.error.msg = errors.msgs
      },
      'show-tip' (response) {
        this.showTip = true
        var self = this
        setTimeout(function () {
          self.showTip = false
        }, 1000)
      },
      'show-loading' (response) {
        this.showLoading = true
      },
      'hide-loading' (response) {
        this.showLoading = false
      }
    },
    components: {
      'LoadingToast': require('./components/loading-toast.vue'),
      'TipToast': require('./components/tip-toast.vue'),
      'ShowAlert': require('./components/show-alert.vue')
    }
  }
</script>
<style lang="scss">
  @import '~vux/vux.css';
  .x-header {
    background-color:#00b5ad;
  }
  .x-header .x-header-title a,.x-header .x-header-title a:active,.x-header h1 a,.x-header h1 a:active {
    color: #fff
  }
  .x-header .x-header-left,.x-header .x-header-right {
    color: #fff
  }
  .x-header .x-header-left a,.x-header .x-header-left button,.x-header .x-header-right a,.x-header .x-header-right button {
    color: #fff
  }
  .x-header .x-header-left .x-header-back:before {
    border-color: #fff;
  }
</style>
