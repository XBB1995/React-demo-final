import actionTypes from "../actions/actionTypes"

const initState = {
  isLoading: false,
  list: [{
    id: 1,
    title: 'Lorem ipsum dolor sit 1111',
    desc: '111 Lorem ipsum dolor sit Lorem ipsum dolor sit, Lorem ipsum dolor sit dwhl Lorem ipsum dolor sitLorem ipsum dolor sit',
    hasRead: false
  }, {
    id: 2,
    title: 'Lorem ipsum dolor sit 2222',
    desc: '2222 Lorem ipsum dolor sit Lorem ipsum dolor sit, Lorem ipsum dolor sit dwhl Lorem ipsum dolor sitLorem ipsum dolor sit',
    hasRead: true
  }]
}

export default (state = initState, action) => {
  switch (action.type) {
    // 开始标记
    case actionTypes.START_NOTIFICATION_POST:
      return {
        ...state,
        isLoading: true
      }
    // 标记完成
    case actionTypes.FINISH_NOTIFICATION_POST:
      return {
        ...state,
        isLoading: false
      }
    // 获取通知列表
    case actionTypes.RECEIVED_NOTIFICATIONS:
      return {
        ...state,
        list: action.payload.list
      }
    // 通过id标记
    case actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID:
      const newList = state.list.map(item => {
        if (item.id === action.payload.id) {
          item.hasRead = true
        }
        return item
      })
      return {
        ...state,
        list: newList
      }
    // 全部标记
    case actionTypes.MARK_ALL_NOTIFICATION_AS_READ:
      return {
        ...state,
        list: state.list.map(item => {
          item.hasRead = true
          return item
        })
      }
    default:
      return state
  }
}