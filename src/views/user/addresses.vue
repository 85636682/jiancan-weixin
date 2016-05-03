<template>
  <x-header>收货地址</x-header>
  <div class="weui_panel weui_panel_access">
    <div class="weui_panel_bd">
      <div class="weui_media_box weui_media_text" v-for="address in addresses" @click="setDefaultAddress(address)">
        <img v-show="address.defaulted" src="../../assets/default.png" style="position: absolute;top:0px;right:0px;width:30px;" />
        <h3 class="weui_media_title">{{address.consignee}}</h3>
        <h3 class="weui_media_desc">{{address.street}}</h3>
      </div>
    </div>
  </div>

  <div class="weui_cells_title">添加地址</div>
  <div class="weui_cells">
    <div class="weui_cell">
      <div class="weui_cell_hd"><label class="weui_label">收货人</label></div>
      <div class="weui_cell_bd weui_cell_primary">
        <input class="weui_input" type="text" v-model="newAddress.consignee" />
      </div>
    </div>
    <div class="weui_cell">
      <div class="weui_cell_hd"><label class="weui_label">电话</label></div>
      <div class="weui_cell_bd weui_cell_primary">
        <input class="weui_input" type="text" placeholder="" v-model="newAddress.mobile" />
      </div>
    </div>
    <div class="weui_cell">
      <div class="weui_cell_hd"><label class="weui_label">地址</label></div>
      <div class="weui_cell_bd weui_cell_primary">
        <input class="weui_input" type="text" placeholder="只要写明街道房屋号即可" v-model="newAddress.street" />
      </div>
    </div>
  </div>


  <div style="width:100%;height:30px;"></div>
  <div class="bd spacing">
    <a @click="createAddress" class="weui_btn weui_btn_primary">保存</a>
  </div>
</template>
<script>
  import XHeader from 'vux/components/x-header'

  export default {
    data () {
      return {
        addresses: {},
        newAddress: {
          consignee: '',
          mobile: '',
          street: ''
        }
      }
    },
    route: {
      data () {
        this.$dispatch('show-loading')
        let access_token = localStorage.getItem('jc_user_access_token')
        if (access_token !== null) {
          this.$http.get('http://jiancan.me/api/u1/receiving_addresses.json', { access_token: access_token }).then(function (response) {
            this.$set('addresses', response.data)
          }, function (response) {
            this.$dispatch('response-msg', response)
          })
        }
        this.$dispatch('hide-loading')
      }
    },
    methods: {
      createAddress () {
        let access_token = localStorage.getItem('jc_user_access_token')
        if (access_token !== null) {
          var formData = new FormData()
          formData.append('access_token', localStorage.jc_user_access_token)
          formData.append('address[consignee]', this.newAddress.consignee)
          formData.append('address[mobile]', this.newAddress.mobile)
          formData.append('address[street]', this.newAddress.street)

          this.$http.post('http://jiancan.me/api/u1/receiving_addresses.json', formData).then(function (response) {
            this.addresses.push(response.data)
            this.newAddress = { consignee: '', mobile: '', street: '' }
          }, function (response) {
            this.$dispatch('response-msg', response)
          })
        }
      },
      setDefaultAddress (address) {
        let access_token = localStorage.getItem('jc_user_access_token')
        if (access_token !== null) {
          this.$http.put('http://jiancan.me/api/u1/receiving_addresses/default.json', { access_token: access_token, address_id: address.id }).then(function (response) {
            if (response.data.result_code === 'SUCCESS') {
              this.addresses.push(response.data)
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
