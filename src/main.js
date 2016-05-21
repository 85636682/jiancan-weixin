'use strict'

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import validator from 'vue-validator'
import VueI18n from 'vue-i18n'
import Locales from './config/locales.json'
import FastClick from 'fastclick'
import { sync } from 'vuex-router-sync'
import routerMap from './routers'
import store from './vuex/store'
import WxApi from './wx-api'

Vue.config.debug = true

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(validator)

Vue.use(VueI18n, {
  lang: 'zh-CN',
  locales: Locales
})

let router = new VueRouter({})

router.beforeEach(transition => {
  if (transition.to.auth) {
    // 对用户身份进行验证...
    let access_token = localStorage.getItem('jc_user_access_token')
    if (!access_token || access_token === null) {
      transition.redirect('/profile')
    }
  }
  FastClick.attach(document.body)

  transition.next()
})

router.afterEach(function (transition) {

})

let main = Vue.extend(require('./main.vue'))

routerMap(router)

sync(store, router)

router.start(main, '#app')

WxApi.init(Vue)
