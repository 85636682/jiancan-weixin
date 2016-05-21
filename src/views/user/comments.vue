<template>
  <x-header>待评价</x-header>
  <div class="bd">
    <div class="weui_panel">
      <div class="weui_panel_bd order_product_list_bd">
        <div v-for="order_product in order_products" href="javascript:void(0);" class="weui_media_box weui_media_appmsg">
          <div class="weui_media_hd">
            <img class="weui_media_appmsg_thumb" :src="order_product.product.avatar80x80" alt="">
          </div>
          <div class="weui_media_bd">
            <h4 class="weui_media_title">{{order_product.product.name}}</h4>
            <p class="weui_media_desc">
            </p>
          </div>
          <div class="weui_media_extra">
            <a v-link="'/user/commenton/' + order_product.id" class="button button-primary button-border button-rounded button-tiny">
              <i class="fa fa-pencil"></i> 评价晒单
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { showAlert, showLoading, hideLoading, showHandleTip } from '../../vuex/actions'
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
        order_products: ''
      }
    },
    route: {
      data (transition) {
        this.showLoading()
        let access_token = localStorage.getItem('jc_user_access_token')
        if (access_token !== null) {
          this.$http.get('http://jiancan.me/api/u1/order_products.json', { access_token: access_token }).then(function (response) {
            this.$set('order_products', response.data)
          }, function (response) {
            this.showAlert(response.data.title, response.data.error)
          })
        }
        this.hideLoading()
      }
    },
    methods: {
    },
    components: {
      XHeader
    }
  }
</script>
