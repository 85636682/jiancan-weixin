<template>
  <x-header>顾客评论</x-header>
  <div class="weui_panel">
    <div class="weui_panel_hd">文字列表附来源</div>
    <div class="weui_panel_bd">
      <div class="weui_media_box weui_media_text" v-for="comment in comments">
        <h4 class="weui_media_title">{{comment.user.nickname}}</h4>
        <p class="weui_media_desc">{{comment.content}}</p>
        <ul class="weui_media_info">
          <li class="weui_media_info_meta">文字来源</li>
          <li class="weui_media_info_meta">时间</li>
          <li class="weui_media_info_meta weui_media_info_meta_extra">其它信息</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import XHeader from 'vux/components/x-header'

export default {
  props: ['shop_id'],
  data () {
    return {
      shop: {},
      comments: []
    }
  },
  route: {
    data (transition) {
      this.$dispatch('show-loading')
      var params = this.$route.params
      this.$http.get('http://jiancan.me/api/u1/shops/one.json', { shop_id: params.shop_id }).then(function (response) {
        this.$set('shop', response.data)
        this.$set('comments', this.shop.comments)
        this.$dispatch('hide-loading')
      }, function (response) {
        this.$dispatch('response-msg', response)
      })
    }
  },
  computed: {
    buildLink () {
      return '/shops/' + this.shop.id
    }
  },
  components: {
    XHeader
  }
}
</script>
