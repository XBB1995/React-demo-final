import React, { Component } from 'react'

import { adminRouter } from './routes'
import { Route, Switch, Redirect } from 'react-router-dom'

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
      <div>
        <div>这里是公共的部分</div>
        <Switch>
          {
            adminRouter.map(route => {
              return (
                <Route
                  key={route.pathname}
                  path={route.pathname}
                  // exact 的值还是需要通过属性确定是否为 true
                  exact={route.exact}
                  // 涉及到权限的需要用render来渲染组件
                  render={(routeProps) => {
                    return <route.component {...routeProps} />
                  }}
                />
              )
            })
          }
          <Redirect to={adminRouter[0].pathname} from="/admin" exact />
          <Redirect to="/404" />
        </Switch>
      </div>
    )
  }
}

export default App