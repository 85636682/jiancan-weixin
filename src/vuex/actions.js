import * as types from './mutation-types'

export const redirectTo = ({ dispatch }, redirect_to, querys, params) => {
  dispatch(types.ROUTE_CHANGED, { path: '/' + redirect_to, query: querys, params: params })
}

export const signin = ({ dispatch }, user) => {
  dispatch(types.SIGN_IN, user)
}

export const signout = ({ dispatch }) => {
  dispatch(types.SIGN_OUT)
}

export const showAlert = ({ dispatch }, title, message) => {
  dispatch(types.SHOW_ALERT, title, message)
}

export const hideAlert = ({ dispatch }) => {
  dispatch(types.HIDE_ALERT)
}

export const showLoading = ({ dispatch }) => {
  dispatch(types.SHOW_LOADING)
}

export const hideLoading = ({ dispatch }) => {
  dispatch(types.HIDE_LOADING)
}

export const showHandleTip = ({ dispatch }) => {
  dispatch(types.SHOW_HANDLE_TIP)
  setTimeout(() => {
    dispatch(types.HIDE_HANDLE_TIP)
  }, 1000)
}

export const hideHandleTip = ({ dispatch }) => {
  dispatch(types.HIDE_HANDLE_TIP)
}
