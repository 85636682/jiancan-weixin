<template>
  <footer>
    <div class="weui_tab">
      <div class="weui_tab_bd"></div>
      <div class="weui_tabbar">
        <a v-link="{ path: '/shops', activeClass: 'weui_bar_item_on' }" class="weui_tabbar_item">
          <div class="weui_tabbar_icon">
            <img src="../assets/iconfont-gouwuche.png" alt="">
          </div>
          <p class="weui_tabbar_label">点餐</p>
        </a>
        <a v-link="{ path: '/coupons' }" class="weui_tabbar_item">
          <div class="weui_tabbar_icon">
            <img src="../assets/iconfont-meishitiyan.png" alt="">
          </div>
          <p class="weui_tabbar_label">优惠券</p>
        </a>
        <a v-link="{ path: '/orders', activeClass: 'weui_bar_item_on' }" class="weui_tabbar_item">
          <div class="weui_tabbar_icon">
            <img src="../assets/iconfont-dingdanxian.png" alt="">
          </div>
          <p class="weui_tabbar_label">订单</p>
        </a>
        <a v-link="{ path: '/profile', activeClass: 'weui_bar_item_on' }" class="weui_tabbar_item">
          <div class="weui_tabbar_icon">
            <img src="../assets/iconfont-wodexian.png" alt="">
          </div>
          <p class="weui_tabbar_label">我的</p>
        </a>
      </div>
    </div>
  </footer>
</template>
<style lang="scss">

</style>
