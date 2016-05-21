<template>
  <x-header>绑定手机</x-header>
  <div class="weui_cells_title">绑定手机</div>
  <div class="weui_cells">
    <div class="weui_cell weui_cell_select weui_select_before">
      <div class="weui_cell_hd">
        <select class="weui_select" name="select2">
          <option value="1">+86</option>
          <option value="2">+80</option>
          <option value="3">+84</option>
          <option value="4">+87</option>
        </select>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <input class="weui_input" type="number" pattern="[0-9]*" placeholder="请输入号码" v-model="mobile"/>
      </div>
    </div>
  </div>
  <div style="width:100%;height:30px;"></div>
  <div class="bd spacing">
    <a href="javascript:;" class="weui_btn weui_btn_primary" @click="updateMobile">保存</a>
  </div>

</template>
<script>
  import { showAlert, showLoading, hideLoading, showHandleTip } from '../../vuex/actions'
  import XHeader from 'vux/components/x-header'

  export default {
    vuex: {
      actions: {
        showAlert,
        showLoading,
        hideLoading,
        showHandleTip
      }
    },
    data () {
      return {
        mobile: ''
      }
    },
    methods: {
      updateMobile () {
        this.showLoading()
        let access_token = localStorage.getItem('jc_user_access_token')
        if (access_token !== null) {
          this.$http.put('http://jiancan.me/api/u1/users/current.json', { access_token: access_token, user: { mobile: this.mobile } }).then(function (response) {
            this.showHandleTip()
          }, function (response) {
            this.showAlert(response.data.title, response.data.error)
          })
        }
        this.hideLoading()
      }
    },
    components: {
      XHeader
    }
  }
</script>
