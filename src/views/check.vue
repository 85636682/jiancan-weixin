<template>
  <navigation-bar :go-back="buildLink">
    <div slot="middle_content">
      完善订单
    </div>
    <div slot="right_items">
      <a @click="login" v-show="!logged" class="weui_btn weui_btn_mini weui_btn_warn" style="margin-top:8px;">登录</a>
    </div>
  </navigation-bar>
  <group title="支付方式">
    <radio :options="payMethodList" :value.sync="order.payMethod"></radio>
  </group>
  <group>
    <datetime :value.sync="order.mealTime" :min-year=currentYear() :max-year=currentYear() format="YYYY-MM-DD HH:II" title="就餐时间"></datetime>
    <x-input :value.sync="order.remarks" title="订单备注" placeholder="口味、偏好等其他要求"></x-input>
  </group>
  <group>
    <x-input :value.sync="order.mobile" title="送餐电话" placeholder="送餐电话"></x-input>
    <textarea :value.sync="order.address" :max=200 placeholder="请填写详细地址"></textarea>
  </group>
  <group title="购买商品">
    <cell v-for="product in selectedProducts" :title=product.name :inline-desc="desc(product)">
      <div slot="value">
        <span style="color: green">￥ {{product.price*product.amount}}</span>
      </div>
    </cell>
  </group>
  <div class="" style="width: 100%;height:50px;"></div>
  <check-bar :logged="logged">
    <span slot="money">总计 ￥ {{totalPrice}}</span>
  </check-bar>
  <div class="weui_dialog_confirm" v-show="confirmLog">
    <div class="weui_mask"></div>
    <div class="weui_dialog">
      <div class="weui_dialog_hd"><strong class="weui_dialog_title">请登录</strong></div>
      <div class="weui_dialog_bd">你还未登录，所以不能下订单，只要微信授权就行，快捷！</div>
      <div class="weui_dialog_ft">
        <a @click="dontWantLog" class="weui_btn_dialog default">还是算了</a>
        <a @click="login" class="weui_btn_dialog primary">去登录</a>
      </div>
    </div>
  </div>
  <div class="weui_dialog_confirm" v-show="checkData">
    <div class="weui_mask"></div>
    <div class="weui_dialog">
      <div class="weui_dialog_hd"><strong class="weui_dialog_title">请检查</strong></div>
      <div class="weui_dialog_bd" style="color: red;">{{errorMsg}}</div>
      <div class="weui_dialog_ft">
        <a @click="goToEdit" class="weui_btn_dialog default">我改改呗</a>
      </div>
    </div>
  </div>
</template>
<script>
  import XInput from 'vux/components/x-input/'
  import Datetime from 'vux/components/datetime/'
  import Textarea from 'vux/components/x-textarea/'
  import Cell from 'vux/components/cell/'
  import Group from 'vux/components/group/'
  import Radio from 'vux/components/radio/'

  export default {
    props: ['shop_id'],
    data () {
      return {
        payMethodList: [ '在线支付', '货到付款' ],
        shopId: 0,
        selectedProducts: [],
        order: {
          payMethod: '在线支付',
          mealTime: '',
          remarks: '',
          mobile: '',
          address: ''
        },
        user: {},
        logged: false,
        confirmLog: true,
        checkData: false,
        errorMsg: ''
      }
    },
    route: {
      data (transition) {
        this.shopId = this.$route.params.shop_id
        this.loadSelected()
        let access_token = localStorage.getItem('jc_user_access_token')
        if (access_token != null) {
          this.logged = true
          this.confirmLog = false
          this.$http.get('http://jiancan.me/api/u1/users/current.json', { access_token: access_token }).then(function (response) {
            this.$set('user', response.data)
            this.order.mobile = this.user.mobile
          }, function (response) {
            this.$dispatch('response-msg', response)
          })
        }
      }
    },
    computed: {
      totalPrice () {
        var money = 0
        for (var i = 0; i < this.selectedProducts.length; i++) {
          money += this.selectedProducts[i].price * this.selectedProducts[i].amount
        }
        return money
      },
      buildLink () {
        return '/shops/' + this.shopId
      }
    },
    methods: {
      goToEdit () {
        this.checkData = false
      },
      currentYear () {
        var date = new Date()
        return date.getFullYear()
      },
      desc (product) {
        return product.amount + ' x ￥' + product.price
      },
      loadSelected () {
        let cart_datas = localStorage.getItem('jc_' + this.$route.params.shop_id + '_cart')
        if (cart_datas != null) {
          this.selectedProducts = JSON.parse(cart_datas)
        }
      },
      clearSelected () {
        localStorage.removeItem('jc_' + this.$route.params.shop_id + '_cart')
      },
      formatProducts () {
        var formProducts = {}
        for (var i = 0; i < this.selectedProducts.length; i++) {
          formProducts[this.selectedProducts[i].id] = this.selectedProducts[i].amount
        }
        return JSON.stringify(formProducts)
      },
      dontWantLog () {
        this.confirmLog = false
      },
      login () {
        window.location.href = 'http://jiancan.me/weixin/authorize?request_url=' + this.$route.name + '&shop_id=' + this.$route.params.shop_id
      }
    },
    events: {
      ordering () {
        this.errorMsg = ''
        this.checkData = false
        if (this.order.address === '') {
          this.errorMsg += '（1）地址还未填写！'
        }
        if (this.order.mealTime === '') {
          this.errorMsg += '（2）就餐时间未填写！'
        }
        if (this.selectedProducts.length <= 0) {
          this.errorMsg += '（3）未选择任何商品！'
        }
        if (this.errorMsg !== '') {
          this.checkData = true
          return
        }
        var formData = new FormData()
        formData.append('access_token', localStorage.jc_user_access_token)
        formData.append('order[shop_id]', this.$route.params.shop_id)
        formData.append('order[takeout]', 'true')
        formData.append('order[pay_method]', this.order.payMethod === '在线支付' ? 'online' : 'offline')
        formData.append('order[meal_time]', this.order.mealTime)
        formData.append('order[remarks]', this.order.remarks)
        formData.append('order[mobile]', this.order.mobile)
        formData.append('order[address]', this.order.address)
        formData.append('products_quantity', this.formatProducts())

        this.$http.post('http://jiancan.me/api/u1/orders.json', formData).then(function (response) {
          let order_id = response.data.id
          this.order = { }
          this.clearSelected()
          this.$route.router.go({ path: '/order/' + order_id })
        }, function (response) {
          console.log(response)
          this.$dispatch('response-msg', response)
        })
      }
    },
    components: {
      'NavigationBar': require('../components/navigation-bar.vue'),
      'CheckBar': require('../components/check-bar.vue'),
      Textarea,
      XInput,
      Datetime,
      Group,
      Cell,
      Radio
    }
  }
</script>
<style lang="scss">
  @import '~vux/vux.css';
</style>
