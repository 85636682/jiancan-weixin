import {
  SIGN_IN,
  SIGN_OUT
} from '../mutation-types'

const state = {
  isLogged: false,
  user: {}
}

const mutations = {
  [SIGN_IN] (state, user) {
    state.isLogged = true
    state.user = user
    localStorage.setItem('jc_user_access_token', user.access_token)
  },
  [SIGN_OUT] (state) {
    state.isLogged = false
    state.user = {}
    localStorage.removeItem('jc_user_access_token')
  }
}

export default {
  state,
  mutations
}
