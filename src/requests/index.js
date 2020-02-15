import axios from 'axios'
import { message } from 'antd'
// 测试是否开发模式
const isDev = process.env.NODE_ENV === 'development'

const service = axios.create({
  baseURL: isDev ? 'http://rap2api.taobao.org/app/mock/244468' : ''
})

// 使用实例拦截请求
service.interceptors.request.use((config) => {
  // 浅复制
  config.data = Object.assign({}, config.data, {
    // authToken: window.localStorage.getItem('authToken')
    authToken: 'itsisdkawjkncwuna12fd1'
  })
  return config
})

// 拦截响应
service.interceptors.response.use((resp) => {
  if (resp.data.code === 200) {
    return resp.data.data
  } else {
    // 全局错误处理
    message.error(resp.data.errMsg)
  }
})

// 向外暴露方法
export const getArticles = (offset = 0, limited = 10) => {
  return service.post('/api/v1/articleList', {
    offset,
    limited
  })
}