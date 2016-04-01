<template>
  <div class="weui_tab">
    <div class="weui_tabbar shopping_cart_bar">
      <a class="weui_tabbar_item">
        <slot name="money">￥ 0</slot>
      </a>
      <a class="weui_tabbar_item bgea8010" @click="showCart">
        <i class="fa fa-shopping-cart"></i> 查看购物车
      </a>
      <a class="weui_tabbar_item bgeb4f38" @click="goCheck">
        去结算
      </a>
    </div>
    <div class="weui_tab_bd"></div>
  </div>
</template>
<script>
  export default {
    methods: {
      showCart () {
        this.$dispatch('show-cart')
      },
      goCheck () {
        this.$dispatch('go-check')
      }
    }
  }
</script>
<style lang="scss">
  .shopping_cart_bar { /* This will make your footer stay where it is */
    height: 50px;
  	background: none repeat scroll 0 0 #FFF;
  	bottom: 0;
  	margin: 0;
  	padding: 0;
  	position: fixed;

    .weui_tabbar_item {
      text-align: center;
      line-height: 40px;
    }

    .bgea8010 {
      color: #fff;
      background-color: #ea8010;
    }

    .bgeb4f38 {
      color: #fff;
      background-color: #eb4f38;
    }
  }
</style>
