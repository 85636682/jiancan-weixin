<template>
  <x-header>评价</x-header>
  <div class="bd">
    <div class="weui_panel">
      <div class="weui_panel_bd order_product_list_bd">
        <div class="weui_media_box weui_media_appmsg">
          <div class="weui_media_hd">
            <img class="weui_media_appmsg_thumb" :src="order_product.product.avatar80x80" alt="">
          </div>
          <div class="weui_media_bd">
            <h4 class="weui_media_title">{{order_product.product.name}}</h4>
            <p class="weui_media_desc">
              <rater :font-size=25 :value.sync="comment.score" slot="value" active-color="#04BE02"></rater>
            </p>
          </div>
          <div class="weui_media_extra">
          </div>
        </div>
        <div class="weui_cells weui_cells_form">
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <textarea class="weui_textarea" placeholder="写下购买体会或者享受食物后的感受，可以为其他小伙伴提供参考~" rows="3" v-model="comment.content"></textarea>
              <div class="weui_textarea_counter"><span>0</span>/200</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div style="width:100%;height:30px;"></div>
  <div class="bd spacing">
    <a @click="commentOn" class="weui_btn weui_btn_primary">保存</a>
  </div>
</template>
<script>
  import XHeader from 'vux/components/x-header'
  import Rater from 'vux/components/rater'

  export default {
    data () {
      return {
        order_product: {
          product: {}
        },
        comment: {
          score: 1,
          content: ''
        }
      }
    },
    route: {
      data (transition) {
        let access_token = localStorage.getItem('jc_user_access_token')
        if (access_token !== null) {
          this.$http.get('http://jiancan.me/api/u1/order_products/one.json', { order_product_id: this.$route.params.order_product_id, access_token: access_token }).then(function (response) {
            this.$set('order_product', response.data)
          }, function (response) {
            this.$dispatch('response-msg', response)
          })
        }
      }
    },
    methods: {
      commentOn () {
        this.$dispatch('show-loading')
        let access_token = localStorage.getItem('jc_user_access_token')
        if (access_token !== null) {
          var formData = new FormData()
          formData.append('access_token', localStorage.jc_user_access_token)
          formData.append('comment[content]', this.comment.content)
          formData.append('comment[score]', this.comment.score)
          formData.append('comment[commentable_type]', 'OrderProduct')
          formData.append('comment[commentable_id]', this.order_product.id)

          this.$http.post('http://jiancan.me/api/u1/comments.json', formData).then(function (response) {
            this.$dispatch('hide-loading')
            this.$route.router.go({ name: 'mycomments' })
          }, function (response) {
            this.$dispatch('hide-loading')
            this.$dispatch('response-msg', response)
          })
        }
      }
    },
    components: {
      XHeader,
      Rater
    }
  }
</script>
