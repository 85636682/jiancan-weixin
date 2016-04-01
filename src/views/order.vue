<template>
  <navigation-bar go-back="/orders">
    <div slot="middle_content">
      我的订单
    </div>
  </navigation-bar>
  <div class="page">
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

      <div class="weui_cells_title" v-if="order.takeout">支付</div>
      <div class="weui_cells weui_cells_access" v-if="order.takeout">
        <a class="weui_cell" href="javascript:;">
          <div class="weui_cell_hd">
            <img src="../assets/iconfont-weixinzhifu.png" alt="" style="width:20px;margin-right:5px;display:block">
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <p>微信支付</p>
          </div>
          <div class="weui_cell_ft">马上支付</div>
        </a>
        <a class="weui_cell" href="javascript:;">
          <div class="weui_cell_hd">
            <img src="../assets/iconfont-zhifubaozhifu.png" alt="" style="width:20px;margin-right:5px;display:block">
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <p>支付宝支付</p>
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
  </div>
</template>
<script>
  export default {
    data () {
      return {
        order: {}
      }
    },
    route: {
      data (transition) {
        let access_token = localStorage.getItem('jc_user_access_token')
        if (access_token != null) {
          this.$http.get('http://jiancan.me/api/u1/orders/one.json', { order_id: this.$route.params.order_id, access_token: access_token }).then(function (response) {
            transition.next({
              order: response.data
            })
          }, function (response) {
            this.$dispatch('response-msg', response)
          })
        }
      }
    },
    components: {
      'NavigationBar': require('../components/navigation-bar.vue')
    }
  }
</script>
