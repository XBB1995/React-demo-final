// 注意使用 combineReducers 自动导出
import { combineReducers } from 'redux'

import notifications from './notifications'
import user from './user'

export default combineReducers({
  notifications,
  user
})