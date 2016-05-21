<template>
  <div id="main">
    <router-view></router-view>
    <div class="weui_dialog_alert" v-show="hasError">
      <div class="weui_mask"></div>
      <div class="weui_dialog">
        <div class="weui_dialog_hd"><strong class="weui_dialog_title">{{title}}</strong></div>
        <div class="weui_dialog_bd">{{message}}</div>
        <div class="weui_dialog_ft">
          <a @click="hideAlertModal" class="weui_btn_dialog primary">确定</a>
        </div>
      </div>
    </div>
    <tip-toast :show="canHandle"></tip-toast>
    <loading-toast :show="loading"></loading-toast>
  </div>
</template>
<script>
  import store from './vuex/store'
  import { showAlert, hideAlert } from './vuex/actions'

  export default {
    store,
    vuex: {
      getters: {
        loading: state => state.loading,
        hasError: state => state.errors.hasError,
        title: state => state.errors.title,
        message: state => state.errors.message,
        canHandle: state => state.canHandle,
        isLogged: state => state.users.isLogged
      },
      actions: {
        showAlert,
        hideAlert
      }
    },
    methods: {
      hideAlertModal () {
        this.hideAlert()
      }
    },
    components: {
      'LoadingToast': require('./components/loading-toast.vue'),
      'TipToast': require('./components/tip-toast.vue')
    },
    created () {
      console.log(this.$route.query.access_token)
      if (this.$route.query.access_token !== '' && this.$route.query.access_token !== undefined) {
        localStorage.setItem('jc_user_access_token', this.$route.query.access_token)
      }
      if (!this.isLogged) {
        let access_token = localStorage.getItem('jc_user_access_token')
        if (access_token !== null) {
          this.$http.post('http://jiancan.me/api/u1/users/authenticate.json', { access_token: access_token }).then(function (response) {
            this.signin(response.data)
          }, function (response) {
            // this.showAlert(response.data.title, response.data.error)
          })
        }
      }
      if (this.$route.query.request_url !== '' && this.$route.query.request_url !== undefined) {
        if (this.$route.query.request_url === 'check') {
          this.$route.router.go({ name: 'check', query: { shop_id: this.$route.query.shop_id } })
        } else if (this.$route.query.request_url === 'coupon') {
          this.$route.router.go({ name: 'coupon', params: { coupon_id: this.$route.query.coupon_id } })
        } else if (this.$route.query.request_url === 'shop') {
          this.$route.router.go({ name: 'shop', params: { shop_id: this.$route.query.shop_id } })
        } else if (this.$route.query.request_url === 'profile') {
          this.$route.router.go({ name: 'profile' })
        }
      }
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
