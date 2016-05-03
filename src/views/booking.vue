<template>
  <x-header>订台单</x-header>
  <div class="weui_cells_title">预定台桌</div>
  <div class="weui_cells">
    <div class="weui_cell">
      <div class="weui_cell_bd weui_cell_primary">
        <p>{{room.name}}</p>
      </div>
      <div class="weui_cell_ft">{{room.shop.name}}</div>
    </div>
  </div>
  <div class="weui_cells_title">预定时间</div>
  <div class="weui_cells">
    <datetime :value.sync="booking_time" :min-year=currentYear() :max-year=currentYear() format="YYYY-MM-DD HH:II" title="就餐时间"></datetime>
  </div>

  <div style="width:100%;height:30px;"></div>
  <div class="bd spacing">
    <a @click="booking" class="weui_btn weui_btn_primary">预定</a>
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
  import Datetime from 'vux/components/datetime/'
  import XHeader from 'vux/components/x-header'

  export default {
    props: ['room_id'],
    data () {
      return {
        room: {
          shop: {}
        },
        booking_time: '',
        errorMsg: '',
        checkData: false
      }
    },
    route: {
      data (transition) {
        var params = this.$route.params
        this.$http.get('http://jiancan.me/api/u1/rooms/one.json', { room_id: params.room_id }).then(function (response) {
          this.$set('room', response.data)
        }, function (response) {
          this.$dispatch('response-msg', response)
        })
      }
    },
    computed: {
      buildLink () {
        return '/rooms/' + this.room.shop_id
      }
    },
    methods: {
      goToEdit () {
        this.checkData = false
      },
      booking () {
        if (this.booking_time === '') {
          this.errorMsg += '预定时间未填写！'
        }
        if (this.errorMsg !== '') {
          this.checkData = true
          return
        }
        let access_token = localStorage.getItem('jc_user_access_token')
        if (access_token !== null) {
          var formData = new FormData()
          formData.append('access_token', localStorage.jc_user_access_token)
          formData.append('booking[booking_time]', this.booking_time)
          formData.append('booking[bookingable_type]', 'Room')
          formData.append('booking[bookingable_id]', this.room.id)
          formData.append('booking[shop_id]', this.room.shop.id)

          this.$http.post('http://jiancan.me/api/u1/bookings.json', formData).then(function (response) {
            this.$route.router.go({ name: 'rooms', params: { shop_id: this.room.shop.id } })
          }, function (response) {
            this.$dispatch('response-msg', response)
          })
        }
      },
      currentYear () {
        var date = new Date()
        return date.getFullYear()
      }
    },
    components: {
      XHeader,
      Datetime
    }
  }
</script>
