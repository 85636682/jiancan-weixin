<template>
  <x-header :left-options="leftOptions">我的</x-header>
  <div class="profile_header">
    <div v-if="user.id" class="shop_card" style="padding-bottom:10px;width: 100%;height: 100px;display:-webkit-box;display:-moz-box;">
      <div class="image" style="margin-left:10px;width:100px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;">
        <img @click="inputFileClick" v-bind:src="user.avatar" width="100px" height="100px" />
        <input @change="uploadAvatar" v-el:avatar class="avatar" type="file" accept="image/*" style="display:none;" />
      </div>
      <div class="content" style="padding-left:25px;-webkit-box-flex:1;-moz-box-flex:1;-webkit-box-ordinal-group:2;-moz-box-ordinal-group:2;margin:0 5px;">
        <a class="header" style="color:#FFF;">{{user.nickname}}</a>
        <div class="meta" style="color:#FFF;font-size:30px;">
        </div>
        <div class="description" style="color:#FFF;">
          <p></p>
        </div>
        <div class="extra" style="color:#FFF;">
        </div>
      </div>
    </div>
    <div v-else class="shop_card" style="padding-bottom:10px;text-align:center;">
      <a class="button button-highlight button-large" @click="login">
        <i class="fa fa-weixin"></i> 登录
      </a>
      <p style="color:#FFF;">
        登录后可享受更多特权
      </p>
    </div>
  </div>
  <div class="weui_tab finance_bar">
    <div class="weui_navbar">
      <div class="weui_navbar_item">
        <div class="weui_tabbar_icon">
          <img src="../assets/iconfont-0yuanfeiyong.png" alt="">
        </div>
        <p class="weui_tabbar_label">
          <a v-link="{ path: '/shops' }">
            {{ isLoged ? '余额 ' + user.balance : '我的余额' }}
          </a>
        </p>
      </div>
      <div class="weui_navbar_item financebar-item">
        <div class="weui_tabbar_icon">
          <img src="../assets/iconfont-hongbao.png" alt="">
        </div>
        <p class="weui_tabbar_label">
          <a v-link="{ path: '/shops' }">我的红包</a>
        </p>
      </div>
      <div class="weui_navbar_item financebar-item">
        <div class="weui_tabbar_icon">
          <img src="../assets/iconfont-jifen.png" alt="">
        </div>
        <p class="weui_tabbar_label">
          <a v-link="{ path: '/shops' }">
            {{ isLoged ? '积分 ' + user.points : '我的积分' }}
          </a>
        </p>
      </div>
    </div>
    <div class="weui_tab_bd"></div>
  </div>
  <div class="weui_cells_title" style="height:20px;"></div>
  <div class="weui_cells weui_cells_access">
    <a class="weui_cell" v-link="'mobile'">
      <div class="weui_cell_hd">
        <i class="fa fa-mobile icon-order" style="font-size:19px;margin-left:5px;margin-right:10px;"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p>绑定手机</p>
      </div>
      <div class="weui_cell_ft">{{ user.mobile ? user.mobile : '绑定享特权' }}</div>
    </a>
    <a class="weui_cell" v-link="'addresses'">
      <div class="weui_cell_hd">
        <i class="fa fa-map-marker icon-order" style="margin-left:4px;margin-right:14px;"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p>收货地址</p>
      </div>
      <div class="weui_cell_ft"></div>
    </a>
    <a class="weui_cell" v-link="'favorites'">
      <div class="weui_cell_hd">
        <i class="fa fa-heart" style="margin-right:10px;color:red;"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p>我的收藏</p>
      </div>
      <div class="weui_cell_ft"></div>
    </a>
  </div>
  <div class="weui_cells_title"></div>
  <div class="weui_cells weui_cells_access">
    <a class="weui_cell" href="javascript:;" v-link="{ name: 'mycoupons' }">
      <div class="weui_cell_hd">
        <i class="fa fa-gift icon-lluckybag" style="margin-right:10px;"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p>优惠券</p>
      </div>
      <div class="weui_cell_ft"></div>
    </a>
    <a class="weui_cell" href="javascript:;">
      <div class="weui_cell_hd">
        <i class="fa fa-credit-card icon-order" style="margin-right:10px;"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p>配送会员卡</p>
      </div>
      <div class="weui_cell_ft"></div>
    </a>
  </div>
  <div class="weui_cells_title"></div>
  <div class="weui_cells weui_cells_access">
    <a class="weui_cell" href="javascript:;">
      <div class="weui_cell_hd">
        <i class="fa fa-cubes icon-service-phone" style="margin-right:10px;"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p>服务中心</p>
      </div>
      <div class="weui_cell_ft"></div>
    </a>
    <a class="weui_cell" href="javascript:;">
      <div class="weui_cell_hd">
        <i class="fa fa-home icon-order" style="margin-right:10px;"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p>下载简餐 App</p>
      </div>
      <div class="weui_cell_ft"></div>
    </a>
  </div>
  <Tabbar></Tabbar>
</template>
<script>
  import XHeader from 'vux/components/x-header'

  export default {
    data () {
      return {
        leftOptions: {
          showBack: false,
          backText: 'Back',
          preventGoBack: true
        },
        user: {},
        isLoged: false
      }
    },
    route: {
      data (transition) {
        let access_token = localStorage.getItem('jc_user_access_token')
        if (access_token !== null) {
          this.$dispatch('show-loading')
          this.$http.get('http://jiancan.me/api/u1/users/current.json', { access_token: access_token }).then(function (response) {
            this.$set('user', response.data)
            this.$set('isLoged', true)
            this.$dispatch('hide-loading')
          }, function (response) {
            this.$dispatch('hide-loading')
            this.$dispatch('response-msg', response)
          })
        } else {
          this.$dispatch('response-msg', { 'status': 1000, 'statusText': '授权登录', 'data': { 'error': '请先授权登录才能使用如下功能！' } })
        }
      }
    },
    methods: {
      inputFileClick () {
        return this.$els.avatar.click()
      },
      uploadAvatar (e) {
        e.preventDefault()

        if (this.$els.avatar.value === '') return
        var formData = new FormData()
        formData.append('access_token', localStorage.getItem('jc_user_access_token'))
        formData.append('user[avatar]', this.$els.avatar.files[0])

        this.$http.put('http://jiancan.me/api/u1/users/current.json', formData).then(function (response) {
          this.$set('user', response.data.user)
        }, function (response) {
          this.$dispatch('response-msg', response)
        })
      },
      login () {
        window.location.href = 'http://jiancan.me/weixin/authorize?request_url=' + this.$route.name
      }
    },
    components: {
      'Tabbar': require('../components/tabbar.vue'),
      XHeader
    }
  }
</script>
<style lang="scss">

</style>
