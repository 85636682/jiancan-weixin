<template>
  <x-header>
    订台单
    <div slot="right">
      <a @click="login" v-show="!isLogged" class="weui_btn weui_btn_mini weui_btn_warn" style="margin-top:-4px;">登录</a>
    </div>
  </x-header>
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
    <a class="weui_cell" href="javascript:;" @click="showAddressesSheet = true">
      <div class="weui_cell_bd weui_cell_primary">
        <p style="color:red;">选择收货地址</p>
      </div>
      <div class="weui_cell_ft">{{user.receiving_addresses.length}}个</div>
    </a>
  </group>
  <!--BEGIN actionSheet-->
  <div class="actionSheet_wrap">
    <div class="weui_mask_transition" :class="{'weui_fade_toggle': showAddressesSheet}" :style="{display: showAddressesSheet ? 'block' : 'none'}" @click="showAddressesSheet = false"></div>
    <div class="weui_actionsheet" :class="{'weui_actionsheet_toggle': showAddressesSheet}">
      <div class="weui_actionsheet_menu">
        <div class="weui_actionsheet_cell" v-for="address in user.receiving_addresses" @click="selectAddress(address)">
          <i class="fa fa-map-marker"></i> {{address.street}}
        </div>
      </div>
      <div class="weui_actionsheet_action">
        <div class="weui_actionsheet_cell" @click="showAddressesSheet = false">取消</div>
      </div>
    </div>
  </div>
  <!--END actionSheet-->
  <group title="购买商品">
    <div class="weui_cell">
      <div class="weui_cell_bd weui_cell_primary">
        <p>运费 <em style="color:red;font-size:12px;">满额￥{{express}}减免</em></p>
      </div>
      <div class="weui_cell_ft"><span style="color: green">￥ {{expressExpenses}}</span></div>
    </div>
    <cell v-for="product in selectedProducts" :title=product.name :inline-desc="desc(product)">
      <div slot="value">
        <span style="color: green">￥ {{product.price*product.amount}}</span>
      </div>
    </cell>
  </group>
  <div class="" style="width: 100%;height:50px;"></div>
  <check-bar :logged="isLogged">
    <span slot="money">总计 ￥ {{collect}}</span>
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
</template>
<script>
  import XInput from 'vux/components/x-input/'
  import Datetime from 'vux/components/datetime/'
  import Textarea from 'vux/components/x-textarea/'
  import Cell from 'vux/components/cell/'
  import Group from 'vux/components/group/'
  import Radio from 'vux/components/radio/'
  import XHeader from 'vux/components/x-header'

  export default {
    data () {
      return {
        payMethodList: [ '在线支付', '货到付款' ],
        shopId: 0,
        express: 0,
        selectedProducts: [],
        order: {
          payMethod: '在线支付',
          mealTime: '',
          remarks: '',
          mobile: '',
          address: ''
        },
        user: {
          receiving_addresses: []
        },
        showAddressesSheet: false,
        isLogged: false,
        confirmLog: true,
        errorMsg: ''
      }
    },
    route: {
      data (transition) {
        this.shopId = this.$route.query.shop_id
        this.express = this.$route.query.express
        this.loadSelected()
        let access_token = localStorage.getItem('jc_user_access_token')
        if (access_token !== null) {
          this.isLogged = true
          this.confirmLog = false
          this.$http.get('http://jiancan.me/api/u1/users/current.json', { access_token: access_token }).then(function (response) {
            this.$set('user', response.data)
            if (this.user.receiving_addresses.length > 0) {
              for (var i = 0; i < this.user.receiving_addresses.length; i++) {
                if (this.user.receiving_addresses[i].defaulted) {
                  this.order.mobile = this.user.receiving_addresses[i].mobile
                  this.order.address = this.user.receiving_addresses[i].street
                }
              }
            } else {
              this.order.mobile = this.user.mobile
            }
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
      expressExpenses () {
        return this.totalPrice >= this.express ? 0 : 2.5
      },
      collect () {
        return this.totalPrice >= this.express ? this.totalPrice : this.totalPrice + 2.5
      },
      buildLink () {
        return '/shops/' + this.shopId
      }
    },
    methods: {
      currentYear () {
        var date = new Date()
        return date.getFullYear()
      },
      desc (product) {
        return product.amount + ' x ￥' + product.price
      },
      loadSelected () {
        let cart_datas = localStorage.getItem('jc_' + this.$route.query.shop_id + '_cart')
        if (cart_datas != null) {
          this.selectedProducts = JSON.parse(cart_datas)
        }
      },
      clearSelected () {
        localStorage.removeItem('jc_' + this.$route.query.shop_id + '_cart')
      },
      formatProducts () {
        var formProducts = {}
        for (var i = 0; i < this.selectedProducts.length; i++) {
          formProducts[this.selectedProducts[i].id] = this.selectedProducts[i].amount
        }
        return JSON.stringify(formProducts)
      },
      dontWantLog () {
        this.$route.router.go({ path: '/shops/' + this.shopId })
      },
      login () {
        window.location.href = 'http://jiancan.me/weixin/authorize?request_url=' + this.$route.name + '&shop_id=' + this.$route.query.shop_id
      },
      showAddresses () {
        this.showAddressesSheet = !this.showAddressesSheet
      },
      selectAddress (address) {
        this.order.mobile = this.address.mobile
        this.order.address = this.address.street
      }
    },
    events: {
      ordering () {
        this.errorMsg = ''
        if (this.order.mobile === '') {
          this.errorMsg += '（1）送餐电话还未填写！'
        }
        if (this.order.address === '') {
          this.errorMsg += '（2）地址还未填写！'
        }
        if (this.order.mealTime === '') {
          this.errorMsg += '（3）就餐时间未填写！'
        }
        if (this.selectedProducts.length <= 0) {
          this.errorMsg += '（4）未选择任何商品！'
        }
        if (this.errorMsg !== '') {
          this.$dispatch('show-alert', { 'title': '请检查', 'msgs': this.errorMsg })
          return
        }
        var formData = new FormData()
        formData.append('access_token', localStorage.jc_user_access_token)
        formData.append('order[shop_id]', this.$route.query.shop_id)
        formData.append('order[takeout]', 'true')
        formData.append('order[pay_method]', this.order.payMethod === '在线支付' ? 'online' : 'offline')
        formData.append('order[meal_time]', this.order.mealTime)
        formData.append('order[remarks]', this.order.remarks)
        formData.append('order[mobile]', this.order.mobile)
        formData.append('order[address]', this.order.address)
        formData.append('products_quantity', this.formatProducts())

        this.$http.post('http://jiancan.me/api/u1/orders.json', formData).then(function (response) {
          let order_id = response.data.id
          this.clearSelected()
          this.$route.router.go({ path: '/order/' + order_id })
        }, function (response) {
          this.$dispatch('response-msg', response)
        })
      }
    },
    components: {
      'CheckBar': require('../components/check-bar.vue'),
      Textarea,
      XInput,
      Datetime,
      Group,
      Cell,
      Radio,
      XHeader
    }
  }
</script>
