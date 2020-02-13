import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import App from './App'

import { mainRouter } from './routes'

// 导入样式表文件
import './index.less'

render(
  <Router>
    <Switch>
      <Route path="/admin" render={(routeProps) => {
        // TODO: 权限 需要登陆才能访问
        return <App {...routeProps} />
      }} />
      {
        mainRouter.map(route => {
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
  </Router>,
  document.querySelector('#root')
)