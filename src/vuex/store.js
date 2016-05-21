import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/logger'
import errors from './modules/errors'
import users from './modules/users'
import { SHOW_LOADING, HIDE_LOADING, SHOW_HANDLE_TIP, HIDE_HANDLE_TIP } from './mutation-types'

Vue.use(Vuex)
Vue.config.debug = true

const debug = process.env.NODE_ENV !== 'production'

const state = {
  loading: false,
  canHandle: false
}

const mutations = {
  [SHOW_LOADING] (state) {
    state.loading = true
  },
  [HIDE_LOADING] (state) {
    state.loading = false
  },
  [SHOW_HANDLE_TIP] (state) {
    state.canHandle = true
  },
  [HIDE_HANDLE_TIP] (state) {
    state.canHandle = false
  }
}

export default new Vuex.Store({
  state,
  mutations,
  modules: {
    errors,
    users
  },
  strict: debug,
  middlewares: debug ? [createLogger()] : []
})
