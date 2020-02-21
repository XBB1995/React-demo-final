import actionTypes from "./actionTypes"
import { getNotifications } from '../requests'

const startNotificationPost = () => {
  return {
    type: actionTypes.START_NOTIFICATION_POST
  }
}

const finishNotificationPost = () => {
  return {
    type: actionTypes.FINISH_NOTIFICATION_POST
  }
}

export const markNotificationAsReadById = (id) => {
  return dispatch => {
    dispatch(startNotificationPost())
    // 模拟的一个服务端的请求
    setTimeout(() => {
      dispatch({
        type: actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID,
        payload: {
          id
        }
      })
      // 需放在内部进行 setTimeout 宏任务
      dispatch(finishNotificationPost())
    }, 1000)
  }
}

export const markAllNotificationsAsRead = () => dispatch => {
  dispatch(startNotificationPost())
  setTimeout(() => {
    dispatch({
      type: actionTypes.MARK_ALL_NOTIFICATION_AS_READ
    })
    dispatch(finishNotificationPost())
  }, 2000)
}

export const getNotificationList = () => dispatch => {
  dispatch(startNotificationPost())
  getNotifications()
    .then(resp => {
      dispatch({
        type: actionTypes.RECEIVED_NOTIFICATIONS,
        payload: {
          list: resp.list
        }
      })
      dispatch(finishNotificationPost())
    }
    )
}