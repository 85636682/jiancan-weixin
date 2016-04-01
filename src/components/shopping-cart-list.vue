<template>
  <div class="actionsheet_wrap">
    <div class="weui_mask_transition" :class="{'weui_fade_toggle': show}" :style="{display: show ? 'block' : 'none'}" @click="show=false"></div>
    <div class="weui_actionsheet" :class="{'weui_actionsheet_toggle': show}">
      <div class="weui_actionsheet_menu">
        <div class="weui_actionsheet_cell" style="background-color: #EEE;">
          <div class="container">
            <div class="left" style="text-align:left;padding-left: 20px;">
              <span class="" style="border-left:solid 2px blue;font-size:15px;padding-left:10px;">购物车</span>
            </div>
            <div class="right" style="text-align:right;padding-right: 20px;">
              <button class="button button-small button-action ">
                <i class="fa fa-trash-o"></i> 清空
              </button>
            </div>
          </div>
        </div>
        <div class="weui_actionsheet_cell" v-for="product in selectedProducts">
          <div class="container">
            <div class="left" style="width:150px;">
              <span style="font-size:16px;">{{product.name}}</span>
              <span style="font-size:14px;color:red;">￥ {{product.price}}</span>
            </div>
            <div class="right" style="text-align:right;padding-right: 20px;">
              <button class="button button-action button-circle button-tiny" @click="minus(product)">
                <i class="fa fa-minus"></i>
              </button>
              {{product.amount}}
              <button class="button button-action button-circle button-tiny add-product" @click="plus(product, $event)">
                <i class="fa fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="weui_actionsheet_cell" style="background-color: #EEE;">
          <div class="container">
            <div class="left" style="text-align:left;padding-left: 20px;">
              <span class="" style="border-left:solid 2px red;font-size:15px;padding-left:10px;">￥ {{totalPrice}}</span>
            </div>
            <div class="right" style="text-align:right;padding-right: 20px;">
              <button @click="goCheck" class="button button-small button-caution">
                <i class="fa fa-trash-o"></i> 结算
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['show', 'selectedProducts'],
    methods: {
      minus (product) {
        this.$dispatch('minus', product)
      },
      plus (product, event) {
        this.$dispatch('plus', product)
      },
      goCheck () {
        this.$dispatch('go-check')
      }
    },
    computed: {
      totalPrice () {
        var money = 0
        for (var i = 0; i < this.selectedProducts.length; i++) {
          money += this.selectedProducts[i].price * this.selectedProducts[i].amount
        }
        return money
      }
    }
  }
</script>
