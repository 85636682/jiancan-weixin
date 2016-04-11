<template>
  <navigation-bar go-back="/what">
    <div slot="middle_content">
      吃什么
    </div>
  </navigation-bar>
  <div class="weui_tab shop_tab">
    <div class="weui_navbar">
      <div class="weui_navbar_item">
        今日特价
      </div>
      <div class="weui_navbar_item">
        新品上市
      </div>
    </div>
    <div class="weui_tab_bd">
    </div>
  </div>
  <what-list :title="currentCategory" :products="products"></what-list>
  <Tabbar></Tabbar>
</template>
<script>
  export default {
    data () {
      return {
        currentCategory: '今日特价',
        products: []
      }
    },
    route: {
      data (transition) {
      }
    },
    components: {
      'Tabbar': require('../components/tabbar.vue'),
      'NavigationBar': require('../components/navigation-bar.vue'),
      'what-list': require('../components/product/what-list.vue')
    }
  }
</script>
