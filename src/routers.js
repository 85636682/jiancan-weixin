'use strict'

export default function (router) {
  router.map({
    '*': {
      component: function (resolve) {
        require(['./views/shops.vue'], resolve)
      }
    },
    '/': {
      name: 'home',
      component: function (resolve) {
        require(['./views/shops.vue'], resolve)
      }
    },
    '/shops': {
      name: 'shops',
      component: function (resolve) {
        require(['./views/shops.vue'], resolve)
      }
    },
    '/shops/:shop_id': {
      component: function (resolve) {
        require(['./views/shop.vue'], resolve)
      }
    },
    '/products/:product_id': {
      name: 'product',
      component: function (resolve) {
        require(['./views/product.vue'], resolve)
      }
    },
    '/rooms/:shop_id': {
      name: 'rooms',
      component: function (resolve) {
        require(['./views/rooms.vue'], resolve)
      }
    },
    '/comments/:shop_id': {
      name: 'comments',
      component: function (resolve) {
        require(['./views/comments.vue'], resolve)
      }
    },
    '/bookings': {
      name: 'bookings',
      component: function (resolve) {
        require(['./views/bookings.vue'], resolve)
      }
    },
    '/booking/:room_id': {
      name: 'booking',
      component: function (resolve) {
        require(['./views/booking.vue'], resolve)
      }
    },
    '/orders': {
      name: 'orders',
      component: function (resolve) {
        require(['./views/orders.vue'], resolve)
      }
    },
    '/order/:order_id': {
      name: 'order',
      component: function (resolve) {
        require(['./views/order.vue'], resolve)
      },
      auth: true
    },
    '/check': {
      name: 'check',
      component: function (resolve) {
        require(['./views/check.vue'], resolve)
      }
    },
    '/profile': {
      name: 'profile',
      component: function (resolve) {
        require(['./views/profile.vue'], resolve)
      }
    },
    '/mobile': {
      name: 'mobile',
      component: function (resolve) {
        require(['./views/user/mobile.vue'], resolve)
      },
      auth: true
    },
    '/favorites': {
      name: 'favorites',
      component: function (resolve) {
        require(['./views/user/favorites.vue'], resolve)
      },
      auth: true
    },
    '/addresses': {
      name: 'addresses',
      component: function (resolve) {
        require(['./views/user/addresses.vue'], resolve)
      },
      auth: true
    },
    '/authorize': {
      name: 'authorize',
      component: function (resolve) {
        require(['./views/authorize.vue'], resolve)
      }
    },
    '/what': {
      name: 'what',
      component: function (resolve) {
        require(['./views/what.vue'], resolve)
      }
    }
  })
}
