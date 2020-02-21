# 创建React项目的基本准备工作

# react-app-rewired & customize-cra
  ## HOC antd less
  空的文件夹 git 不会记录

# react-router-dom 
  ## 基本路由配置  
  ### 在 index.js 文件中配置外部路由 Router Route Switch Redirect
  ### 在 App.js 文件中配置内部(admin)路由 
  注意 exact 的使用！！！
  ## 路由的懒加载
  ### react-loadable
      const MyComponent = Loadable({
        loader: ()=>import('./MyComponent'),
        <!-- 自定义的Loading组件 -->
        loading: Loading
      })
# rap2.org & postman APP 
  ## 数据mock模拟和端口测试
  ### 后端数据格式 设计标准
  ### antd Table 组件的使用
  ## 配置 ajax 请求 在services/requests文件 下定制
  ## 分页 跳转操作
  ## 删除以及编辑功能的实现
  ### 设计删除端口 
  1. 如果使用RESTful风格的编辑接口 则可使用 DELETE 
  2. 如果统一使用 POST 则需要在地址中增加 delete 层级来标注功能
  ## 模态框的定制 注意一些增加交互性的细节
  ## 修改自己编写的loadable文件的props数据传递的丢失
  ## frame 高亮bug修复
# 网页上图表的技术
  1. canvas 位图
  2. svg 矢量图
  3. 三维 webgl
  ## 数据可视化
  UI界面设计与通知中心的基本设置
# 通知中心数据 给予redux进行管理
  ## action reducer store
  ## 库
   1. react-redux
   2. redux
   3. redux-thunk
  ## 具体红点及数字逻辑实现