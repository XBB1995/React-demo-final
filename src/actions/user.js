import actionTypes from "./actionTypes";

import { loginRequest } from '../requests'

const startLogin = () => {
  return {
    type: actionTypes.START_LOGIN
  }
}

const loginSuccess = (userInfo) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: {
      userInfo
    }
  }
}

const loginFailed = () => {
  // 登录失败则需要清除数据
  window.localStorage.removeItem("authToken")
  window.localStorage.removeItem("userInfo")
  window.sessionStorage.removeItem("authToken")
  window.sessionStorage.removeItem("userInfo")
  return {
    type: actionTypes.LOGIN_FAILED
  }
}

export const changeAvatar = (avatarURL) => {
  return {
    type: actionTypes.CHANGE_AVATAR,
    payload: {
      avatarURL
    }
  }
}

export const logout = () => {
  return dispatch => {
    // 实际上 需要告诉服务端 用户退出登录
    dispatch(loginFailed())
  }
}

export const login = (userInfo) => {
  return dispatch => {
    dispatch(startLogin())
    loginRequest(userInfo)
      .then(resp => {
        if (resp.data.code === 200) {
          const {
            authToken,
            ...newUserInfo
          } = resp.data.data
          if (userInfo.remember === true) {
            window.localStorage.setItem("authToken", authToken)
            window.localStorage.setItem("userInfo", JSON.stringify(newUserInfo))
          } else {
            window.sessionStorage.setItem("authToken", authToken)
            window.sessionStorage.setItem("userInfo", JSON.stringify(newUserInfo))
          }
          dispatch(loginSuccess(newUserInfo))
        } else {
          dispatch(loginFailed())
        }
      })
  }
}