# 创建React项目的基本准备工作
1. react-app-rewired & customize-cra
  ## HOC antd less
  空的文件夹 git 不会记录

2. react-router-dom 
  # 基本路由配置  
  ## 在 index.js 文件中配置外部路由 Router Route Switch Redirect
  ## 在 App.js 文件中配置内部(admin)路由 
  注意 exact 的使用！！！
  # 路由的懒加载
  ## react-loadable
      const MyComponent = Loadable({
        loader: ()=>import('./MyComponent'),
        <!-- 自定义的Loading组件 -->
        loading: Loading
      })