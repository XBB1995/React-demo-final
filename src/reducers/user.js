import actionTypes from "../actions/actionTypes"

const isLogin = Boolean(window.localStorage.getItem("authToken")) || Boolean(window.sessionStorage.getItem("authToken"))
const userInfo = JSON.parse(window.localStorage.getItem("userInfo")) || JSON.parse(window.sessionStorage.getItem("userInfo"))

const initState = {
  ...userInfo,
  isLogin,
  isLoading: false,
  // 用户的访问权限级别
  role: "003"
}

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.START_LOGIN:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload.userInfo,
        isLogin: true,
        isLoading: false
      }
    case actionTypes.LOGIN_FAILED:
      return {
        id: '',
        displayName: '',
        avatar: '',
        isLogin,
        isLoading: false,
        // 用户的访问权限级别
        role: "003"
      }
    case actionTypes.CHANGE_AVATAR:
      return {
        ...state,
        avatar: action.payload.avatarURL
      }
    default:
      return state
  }
}