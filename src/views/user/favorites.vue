<template>
  <x-header>我的收藏</x-header>
  <div class="weui_panel weui_panel_access">
    <div class="weui_panel_hd">喜爱的店铺</div>
    <div class="weui_panel_bd shop_list_bd">
      <a v-for="shop in shops" v-link="'shops/' + shop.id" class="weui_media_box weui_media_appmsg">
        <div class="weui_media_hd">
          <img class="weui_media_appmsg_thumb" v-bind:src="shop.avatar" alt="">
        </div>
        <div class="weui_media_bd">
          <h4 class="weui_media_title">{{shop.name}}</h4>
          <p class="weui_media_desc" style="font-size:15px;">
            <span class="" v-for="meal in shop.meals">
              {{ translateMeal(meal) }}
            </span>
          </p>
          <p class="weui_media_desc">
            <rater :value.sync="data42" slot="value" active-color="#04BE02" :font-size=15 disabled></rater>
          </p>
        </div>
      </a>
    </div>
  </div>
</template>
<script>
  import XHeader from 'vux/components/x-header'
  import Rater from 'vux/components/rater'

  export default {
    data () {
      return {
        shops: {}
      }
    },
    route: {
      data () {
        this.$dispatch('show-loading')
        let access_token = localStorage.getItem('jc_user_access_token')
        if (access_token !== null) {
          this.$http.get('http://jiancan.me/api/u1/favorites/shops.json', { access_token: access_token }).then(function (response) {
            this.$set('shops', response.data)
          }, function (response) {
            this.$dispatch('response-msg', response)
          })
        }
        this.$dispatch('hide-loading')
      }
    },
    components: {
      XHeader,
      Rater
    }
  }
</script>
