import {
  SHOW_ALERT,
  HIDE_ALERT
} from '../mutation-types'

const state = {
  hasError: false,
  title: '',
  message: ''
}

const mutations = {
  [SHOW_ALERT] (state, title, message) {
    state.hasError = true
    state.title = title
    state.message = message
  },
  [HIDE_ALERT] (state) {
    state.hasError = false
    state.title = ''
    state.message = ''
  }
}

export default {
  state,
  mutations
}
