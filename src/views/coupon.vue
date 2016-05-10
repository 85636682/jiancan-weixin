<template>
  <x-header :left-options="leftOptions">{{coupon.title}}</x-header>
  <div class="bd">
    <div class="hd-bg" v-show="closeEnter">
      <a href="http://wx.xj8.net/guide/index">
        <i class="fa fa-question-circle-o"></i> 查看优惠券领取使用说明
      </a>
      <div style="float:right;margin-right:10px;">
        <i class="fa fa-times-circle-o" @click="close_enter"></i>
      </div>
    </div>

    <img class="jc-img-responsive jc-margin-bottom-xs" src="http://upyun.wx.xj8.net//uploads/tpl/header/5a3b15bc516c.jpg" alt="5a3b15bc516c">

    <div class="coupon_count">
      已有 {{coupon.coupon_users_count}} 人参与此活动,
      您还有 <span class="count_span">{{ receive ? 0 : 1 }}</span> 次领取机会
    </div>

    <flexbox orient="vertical" v-if="logined">
      <flexbox-item v-if="!user.mobile">
        <div style="padding-top: 10px;padding-left:21px;padding-right:11px;">
          <input v-model="mobile" type="tel" class="jc-input-block" maxlength="11" minlength="11" placeholder="请输入手机号马上领取" />
        </div>
      </flexbox-item>
      <flexbox-item >
        <a @click="receiveCoupon" v-if="!receive" class="button button-block button-rounded button-caution" href="javascript:;" style="margin: 10px;">
          立即领取
        </a>
        <a @click="myCoupons" v-if="receive" class="button button-block button-rounded button-caution" href="javascript:;" style="margin: 10px;">
          你已领取，点击查看
        </a>
      </flexbox-item>
    </flexbox>
    <flexbox v-if="!logined">
      <flexbox-item v-if="!receive">
        <a @click="login" class="button button-block button-rounded button-caution" href="javascript:;" style="margin: 10px;">
          授权领取
        </a>
      </flexbox-item>
    </flexbox>

    <flexbox orient="vertical">
      <flexbox-item style="text-align:center;">
        <p>地址：{{coupon.shop.address}}</p>
      </flexbox-item>
      <flexbox-item style="text-align:center;">
        <p>
          电话：{{coupon.shop.mobile}}
        </p>
      </flexbox-item>
      <flexbox-item style="text-align:center;">
        <span>套餐内容</span>
        <table class="coupon-products-table">
          <tr>
            <td colspan="4">
              参与优惠劵的商品
            </td>
          </tr>
          <tr v-for="coupon_product in coupon.coupon_products">
            <td class="avatars"><img alt="店铺头像" class="img-circle" width="30" height="30" v-bind:src="coupon_product.product.avatar" /></td>
            <td class="names">{{coupon_product.product.name}}</td>
            <td class="prices">￥ {{coupon_product.product.price}}</td>
            <td class="amounts">{{coupon_product.amount}} 份</td>
          </tr>
        </table>
      </flexbox-item>
    </flexbox>

    <div class="am-u-sm-12">
      <center>
        <img v-for="image in coupon.images" :src="image.img520xAuto" class="jc-img-responsive am-img-thumbnail am-radius jc-margin-bottom-xs" style="display: block;">
      </center>
    </div>

    <div style="text-align: center;color: #000;">
      本页面由简餐网提供<br>
      技术支持:动起来软件有限公司 业务咨询: 15768092082
    </div>
  </div>

  <div style="height:60px;width:100%;"></div>

  <flexbox class="shared_and_addr">
    <flexbox-item style="padding-left: 5px;">
      <a href="tel:{{ coupon.shop.mobile }}" class="button button-block button-rounded button-highlight">
        <i class="fa fa-phone"></i> 咨询电话
      </a>
    </flexbox-item>
    <flexbox-item style="padding-right: 5px;">
      <a href="javascript:;" class="button button-block button-rounded button-highlight">
        <i class="fa fa-map-marker"></i> 店铺地址
      </a>
    </flexbox-item>
  </flexbox>
</template>
<script>
  import XHeader from 'vux/components/x-header'
  import Flexbox from 'vux/components/flexbox'
  import FlexboxItem from 'vux/components/flexbox-item'

  export default {
    data () {
      return {
        leftOptions: {
          showBack: true,
          backText: 'Back',
          preventGoBack: true
        },
        closeEnter: true,
        logined: false,
        receive: false,
        coupon: {
          shop: {}
        },
        user: {},
        mobile: ''
      }
    },
    route: {
      data (transtion) {
        this.$dispatch('show-loading')

        this.$http.get('http://jiancan.me/api/u1/coupons/one.json', { coupon_id: this.$route.params.coupon_id }).then(function (response) {
          this.$set('coupon', response.data)
        }, function (response) {
          this.$dispatch('response-msg', response)
        })

        let access_token = localStorage.getItem('jc_user_access_token')
        if (access_token !== null) {
          this.$http.get('http://jiancan.me/api/u1/users/current.json', { access_token: access_token }).then(function (response) {
            this.$set('user', response.data)
            this.logined = true
          }, function (response) {
            this.$dispatch('response-msg', response)
          })
          this.$http.get('http://jiancan.me/api/u1/coupon_users/check.json', { access_token: access_token, coupon_id: this.$route.params.coupon_id }).then(function (response) {
            if (response.data.result_code === 'SUCCESS') {
              this.receive = true
            }
          }, function (response) {
            this.$dispatch('response-msg', response)
          })
        }
        this.$dispatch('hide-loading')
      }
    },
    methods: {
      close_enter () {
        this.closeEnter = !this.closeEnter
      },
      receiveCoupon () {
        this.$dispatch('show-loading')
        let access_token = localStorage.getItem('jc_user_access_token')
        if (access_token !== null) {
          this.$http.post('http://jiancan.me/api/u1/coupon_users.json', { access_token: access_token, coupon_id: this.$route.params.coupon_id }).then(function (response) {
            this.receive = true
            this.$dispatch('show-tip')
          }, function (response) {
            this.$dispatch('response-msg', response)
          })
          if (!this.user.mobile) {
            this.$http.put('http://jiancan.me/api/u1/users/current.json', { access_token: access_token, mobile: this.mobile }).then(function (response) {
              this.$set('user', response.data)
            }, function (response) {
              this.$dispatch('response-msg', response)
            })
          }
        }
        this.$dispatch('hide-loading')
      },
      myCoupons () {
        this.$route.router.go({ name: 'mycoupons' })
      },
      login () {
        window.location.href = 'http://jiancan.me/weixin/authorize?request_url=' + this.$route.name + '&coupon_id=' + this.$route.params.coupon_id
      }
    },
    events: {
      'on-click-back' () {
        this.$route.router.go({ name: 'coupons' })
      }
    },
    components: {
      XHeader,
      Flexbox,
      FlexboxItem
    }
  }
</script>
<style lang="scss">
  .shared_and_addr {
    position: fixed;
    right: 0;
    bottom: 0px;
    left: 0;
    padding: 1rem;
    background-color: #efefef;
    opacity: 0.8;
    z-index: 18888;
    padding: 4px 0
  }
  .hd-bg {
    background: rgba(0, 0, 0, 0.7);
    text-align: center;
    height: 30px;
    line-height: 30px;
    color: #FFF;
    a {
      color: #FFF;
    }
  }
  .coupon_count {
    color: #000;
    text-align: center;
  }
  .jc-input-block {
    display: block;
    width: 100%;
    padding: 5px;
    margin-left: -11px;
    font-size: 1rem;
    line-height: 1.5;
    color: #55595c;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
  }

  .coupon-products-table {
    overflow:hidden;
    width:100%;
  }
  .coupon-products-table td {
    overflow: hidden;
  }
  .coupon-products-table .avatars {
    width: 40px;
  }
  .coupon-products-table .names {
    text-align: left;
  }
  .coupon-products-table .prices {
    width: 80px;
  }
  .coupon-products-table .amounts {
    width: 60px;
  }
</style>
