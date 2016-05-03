<template>
  <x-header>我的订单</x-header>
  <div class="bd">
    <div class="weui_cells_title">订单详情</div>
    <div class="weui_cells">
      <div class="weui_cell">
        <div class="weui_cell_hd">
          <img src="../assets/iconfont-bianhao.png" alt="" style="width:20px;margin-right:5px;display:block">
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <p>编号</p>
        </div>
        <div class="weui_cell_ft">{{order.sn}}</div>
      </div>
      <div class="weui_cell">
        <div class="weui_cell_hd">
          <img src="../assets/iconfont-shijian.png" alt="" style="width:20px;margin-right:5px;display:block">
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <p>时间</p>
        </div>
        <div class="weui_cell_ft">{{order.created_at}}</div>
      </div>
      <div class="weui_cell">
        <div class="weui_cell_hd">
          <img src="../assets/iconfont-jiaqian.png" alt="" style="width:20px;margin-right:5px;display:block">
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <p>总价</p>
        </div>
        <div class="weui_cell_ft">￥{{order.total_price}}</div>
      </div>
      <div class="weui_cell">
        <div class="weui_cell_hd">
          <img src="../assets/zhuangtai@64x64.png" alt="" style="width:20px;margin-right:5px;display:block">
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <p>状态</p>
        </div>
        <div class="weui_cell_ft">{{order.status_text}}</div>
      </div>
      <div class="weui_cell">
        <div class="weui_cell_hd">
          <img src="../assets/iconfont-shop.png" alt="" style="width:20px;margin-right:5px;display:block">
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <p>店铺</p>
        </div>
        <div class="weui_cell_ft">{{order.shop.name}}</div>
      </div>
      <div class="weui_cell">
        <div class="weui_cell_hd">
          <img src="../assets/iconfont-leibie.png" alt="" style="width:20px;margin-right:5px;display:block">
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <p>类型</p>
        </div>
        <div class="weui_cell_ft">{{order.takeout ? "外卖单" : "堂食"}}</div>
      </div>
      <div class="weui_cell" v-if="order.takeout">
        <div class="weui_cell_hd">
          <img src="../assets/iconfont-shijian.png" alt="" style="width:20px;margin-right:5px;display:block">
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <p>送货时间</p>
        </div>
        <div class="weui_cell_ft">{{order.meal_time}}</div>
      </div>
      <div class="weui_cell" v-if="order.takeout">
        <div class="weui_cell_hd">
          <img src="../assets/iconfont-dizhi.png" alt="" style="width:20px;margin-right:5px;display:block">
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <p>送货地址</p>
        </div>
        <div class="weui_cell_ft">{{order.address}}</div>
      </div>
      <div class="weui_cell" v-if="order.takeout">
        <div class="weui_cell_hd">
          <img src="../assets/iconfont-liuyan.png" alt="" style="width:20px;margin-right:5px;display:block">
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <p>订单留言</p>
        </div>
        <div class="weui_cell_ft">{{order.remarks}}</div>
      </div>
      <div class="weui_cell" v-if="order.takeout">
        <div class="weui_cell_hd">
          <img src="../assets/iconfont-zhifufangshi.png" alt="" style="width:20px;margin-right:5px;display:block">
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <p>付款方式</p>
        </div>
        <div class="weui_cell_ft">{{order.pay_method_text}}</div>
      </div>
    </div>

    <div class="weui_cells_title" v-if="canPay">支付</div>
    <div class="weui_cells weui_cells_access" v-if="canPay">
      <a class="weui_cell" href="javascript:;" @click="weiXinPay">
        <div class="weui_cell_hd">
          <img src="../assets/iconfont-weixinzhifu.png" alt="" style="width:20px;margin-right:5px;display:block">
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <p>微信支付</p>
        </div>
        <div class="weui_cell_ft">马上支付</div>
      </a>
    </div>

    <div class="weui_cells_title">商品列表</div>
    <div class="weui_cells">
      <div v-for="order_product in order.order_products" class="weui_cell">
        <div class="weui_cell_hd">
          <img :src="order_product.product.avatar" alt="" style="width:30px;margin-right:5px;display:block">
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <p>{{order_product.product.name}}</p>
        </div>
        <div class="weui_cell_ft">￥{{order_product.product.price}} x {{order_product.quantity}}</div>
      </div>
    </div>

  </div>
</template>
<script>
  import XHeader from 'vux/components/x-header'

  export default {
    data () {
      return {
        order: {
          shop: {}
        }
      }
    },
    route: {
      data (transition) {
        this.$dispatch('show-loading')
        let access_token = localStorage.getItem('jc_user_access_token')
        if (access_token !== null) {
          this.$http.get('http://jiancan.me/api/u1/orders/one.json', { order_id: this.$route.params.order_id, access_token: access_token }).then(function (response) {
            this.$set('order', response.data)
            console.log(this.order)
          }, function (response) {
            this.$dispatch('response-msg', response)
          })
        }
        this.$dispatch('hide-loading')
      }
    },
    computed: {
      canPay () {
        return this.order.takeout && this.order.pay_method === 'online'
      }
    },
    methods: {
      weiXinPay () {
        let access_token = localStorage.getItem('jc_user_access_token')
        let self = this
        if (access_token !== null) {
          this.$http.get('http://jiancan.me/api/u1/pay.json', { order_id: this.$route.params.order_id, access_token: access_token }).then(function (response) {
            if (response.data.result_code !== undefined && response.data.result_code === 'FAIL') {
              window.alert(response.data.err_code_des)
            } else {
              window.wx.chooseWXPay({
                timestamp: response.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: response.data.nonceStr, // 支付签名随机串，不长于 32 位
                package: 'prepay_id=' + response.data.prepay_id, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: response.data.paySign, // 支付签名
                success: function (res) {
                  // 支付成功后的回调函数
                  self.order.status_text = '已支付'
                },
                fail: function (res) {
                  console.log(res)
                },
                cancel: function (res) {
                  // 支付取消
                }
              })
            }
          }, function (response) {
            this.$dispatch('response-msg', response)
          })
        }
      }
    },
    components: {
      XHeader
    }
  }
</script>
