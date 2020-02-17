import React, { Component } from 'react'

import { adminRoutes } from './routes'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Frame } from './compoents'

// 通过 Frame 传递 menus 参数
const menus = adminRoutes.filter(route => route.isNav === true)

// fixBabelImports 通过这个简化组件导入
// import {
//   Button
// } from 'antd'

// const testHOC = (WrappedCompoenent) => {
//   return class HOCComponent extends Component {
//     render() {
//       return (
//         <>
//           <WrappedCompoenent />
//           <div>高阶组件包含的信息</div>
//         </>
//       )
//     }
//   }
// }

// @testHOC
class App extends Component {
  render() {
    return (
      <Frame menus={menus}>
        <Switch>
          {
            adminRoutes.map(route => {
              return (
                <Route
                  key={route.pathname}
                  path={route.pathname}
                  // exact 的值还是需要通过属性确定是否为 true
                  exact={route.exact}
                  // 涉及到权限的需要用render来渲染组件
                  render={(routeProps) => {
                    // console.log(routeProps)
                    return <route.component {...routeProps} />
                  }}
                />
              )
            })
          }
          <Redirect to={adminRoutes[0].pathname} from="/admin" exact />
          <Redirect to="/404" />
        </Switch>
      </Frame>
    )
  }
}

export default App