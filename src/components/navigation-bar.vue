<template>
  <div class="navigation_bar">
    <div class="middle">
      <slot name="middle_content">
      </slot>
    </div>
    <div class="left">
      <a class="go_back" @click="GoBack">
        <i class="fa fa-arrow-left"></i>
      </a>
    </div>
    <div class="right">
      <slot name="right_items">
      </slot>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['goBack'],
    methods: {
      GoBack () {
        this.$route.router.go({ path: this.goBack })
      }
    }
  }
</script>
