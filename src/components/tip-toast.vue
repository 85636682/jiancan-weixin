<template>
  <div id="toast" v-show="show">
    <div class="weui_mask_transparent"></div>
    <div class="weui_toast">
      <i class="weui_icon_toast"></i>
      <p class="weui_toast_content">已完成</p>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['show']
  }
</script>
