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
// 获取文章列表
export const getArticles = (offset = 0, limited = 10) => {
  return service.post('/api/v1/articleList', {
    offset,
    limited
  })
}

// 删除指定id的文章
export const deleteArticleById = (id) => {
  return service.post(`/api/v1/articleDelete/${id}`)
  // return service.post(`/api/v1/articleDelete`, {
  //   id
  // })
}

// 通过id获取文章
export const getArticleById = (id) => {
  return service.post(`/api/v1/article/${id}`)
  // 有一个坑！！！ 若接口地址为 /api/v1/article 使用上一行的方法不会报错
  // 但是 如果用对象传值 则会显示找不到对应的接口
  // return service.post(`/api/v1/article`, {
  //   id
  // })
}

// 保存文章
export const saveArticle = (id, data) => {
  return service.post(`/api/v1/articleEdit/${id}`, data)
}

// 获取文章阅读量
export const getArticleAmount = () => {
  return service.post('/api/v1/articleAmount')
}