<template>
  <div class="x-header">
    <div class="x-header-left">
      <a class="x-header-back" @click.preventDefault v-show="leftOptions.showBack" @click="onClickBack">{{leftOptions.backText}}</a>
      <slot name="left"></slot>
    </div>
    <h1 class="x-header-title"><slot></slot></h1>
    <div class="x-header-right">
      <a class="x-header-more" @click.preventDefault @click="$dispatch('on-click-more')" v-if="rightOptions.showMore"></a>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    leftOptions: {
      type: Object,
      default () {
        return {
          showBack: true,
          backText: 'Back',
          preventGoBack: false
        }
      }
    },
    rightOptions: {
      type: Object,
      default () {
        return {
          showMore: false
        }
      }
    }
  },
  methods: {
    onClickBack: function () {
      if (this.leftOptions.preventGoBack) {
        this.$dispatch('on-click-back')
      } else {
        history.back()
      }
    }
  }
}
</script>
