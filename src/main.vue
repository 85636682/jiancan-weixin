<template>
  <div id="main">
    <router-view></router-view>
    <div class="weui_dialog_alert" v-show="showAlert">
      <div class="weui_mask"></div>
      <div class="weui_dialog">
        <div class="weui_dialog_hd"><strong class="weui_dialog_title">{{error.title}}</strong></div>
        <div class="weui_dialog_bd">{{error.msg}}</div>
        <div class="weui_dialog_ft">
          <a @click="showAlert = false" class="weui_btn_dialog primary">确定</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        showAlert: false,
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
          localStorage.email = ''
          localStorage.token = ''
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
      }
    }
  }
</script>
