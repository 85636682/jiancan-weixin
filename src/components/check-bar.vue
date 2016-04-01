<template>
  <div class="weui_tab">
    <div class="weui_tab_bd"></div>
    <div class="weui_tabbar check-bar">
      <div class="weui_tabbar_item cart">
        <slot name="money">￥ 0</slot>
      </div>
      <div class="weui_tabbar_item order">
        <button @click="ordering" class="button button-action" v-bind:class="{ 'disabled': !logged }">确认下单</button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['logged'],
    methods: {
      ordering () {
        this.$dispatch('ordering')
      }
    }
  }
</script>
<style lang="scss">
  .check-bar { /* This will make your footer stay where it is */
  	background: none repeat scroll 0 0;
    background: rgba(0, 0, 0, 0.8);
    -moz-box-shadow: 0 0 13px 3px rgba(0,0,0,.5);
    -webkit-box-shadow: 0 0 13px 3px rgba(0,0,0,.5);
    box-shadow: 0 0 13px 3px rgba(0,0,0,.5);
  	bottom: 0;
  	width: 100%;
  	height: 40px;
  	margin: 0;
  	padding: 0;
  	position: fixed;

    .cart {
      padding-left: 10px;
      color: #FFF;
    }

    .order {
      text-align: right;
      padding-top: 0px;
    }
  }
</style>
