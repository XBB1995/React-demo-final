import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

// 国际化
import zhCN from 'antd/es/locale/zh_CN'
import { ConfigProvider } from 'antd'
import App from './App'

import { mainRoutes } from './routes'

// 导入样式表文件
import './index.less'

render(
  <ConfigProvider locale={zhCN}>
    <Router>
      <Switch>
        <Route path="/admin" render={(routeProps) => {
          // TODO: 权限 需要登陆才能访问
          return <App {...routeProps} />
        }} />
        {
          mainRoutes.map(route => {
            return (
              <Route
                key={route.pathname}
                path={route.pathname}
                component={route.component}
              />
            )
          })
        }
        <Redirect to="/admin" exact from="/" />
        <Redirect to="/404" />
      </Switch>
    </Router>
  </ConfigProvider>,
  document.querySelector('#root')
)