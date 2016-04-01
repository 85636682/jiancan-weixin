'use strict'

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import validator from 'vue-validator'
import VueI18n from 'vue-i18n'
import Locales from './config/locales.json'
import FastClick from 'fastclick'
import NProgress from 'nprogress'
import routerMap from './routers'
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
  FastClick.attach(document.body)
  NProgress.configure({
    template: "<div role='bar' id='loadingToast' class='weui_loading_toast'><div class='weui_mask_transparent'></div><div class='weui_toast'><div class='weui_loading'><div class='weui_loading_leaf weui_loading_leaf_0'></div><div class='weui_loading_leaf weui_loading_leaf_1'></div><div class='weui_loading_leaf weui_loading_leaf_2'></div><div class='weui_loading_leaf weui_loading_leaf_3'></div><div class='weui_loading_leaf weui_loading_leaf_4'></div><div class='weui_loading_leaf weui_loading_leaf_5'></div><div class='weui_loading_leaf weui_loading_leaf_6'></div><div class='weui_loading_leaf weui_loading_leaf_7'></div><div class='weui_loading_leaf weui_loading_leaf_8'></div><div class='weui_loading_leaf weui_loading_leaf_9'></div><div class='weui_loading_leaf weui_loading_leaf_10'></div><div class='weui_loading_leaf weui_loading_leaf_11'></div></div><p class='weui_toast_content'>数据加载中</p></div></div>"
  })
  NProgress.start()
  transition.next()
})

router.afterEach(function (transition) {
  NProgress.done()
})

let main = Vue.extend(require('./main.vue'))

routerMap(router)

router.start(main, '#app')

WxApi.init(Vue)
