<template>
  <navigation-bar>
    <div slot="middle_content">
      订单列表
    </div>
  </navigation-bar>
  <div class="page">
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
              <p class="weui_media_desc">由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。</p>
              <ul class="weui_media_info">
                <li class="weui_media_info_meta">￥ {{order.total_price}}</li>
                <li class="weui_media_info_meta">{{order.created_at}}</li>
                <li class="weui_media_info_meta weui_media_info_meta_extra">其它信息</li>
              </ul>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Tabbar></Tabbar>
</template>
<script>
  export default {
    data () {
      return {
        orders: {},
        isLogged: false
      }
    },
    route: {
      data (transition) {
        let access_token = localStorage.getItem('jc_user_access_token')
        if (access_token != null) {
          this.isLogged = true
          this.$http.get('http://jiancan.me/api/u1/orders.json', { access_token: access_token }).then(function (response) {
            transition.next({
              orders: response.data
            })
          }, function (response) {
            this.$dispatch('response-msg', response)
          })
        }
      }
    },
    components: {
      'Tabbar': require('../components/tabbar.vue'),
      'NavigationBar': require('../components/navigation-bar.vue')
    }
  }
</script>
