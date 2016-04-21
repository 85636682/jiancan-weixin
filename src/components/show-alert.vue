<template>
  <div class="weui_dialog_alert" v-show="show">
    <div class="weui_mask"></div>
    <div class="weui_dialog">
      <div class="weui_dialog_hd"><strong class="weui_dialog_title">{{error.title}}</strong></div>
      <div class="weui_dialog_bd">{{error.msg}}</div>
      <div class="weui_dialog_ft">
        <a @click="show = false" class="weui_btn_dialog primary">确定</a>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['show', 'error']
  }
</script>
