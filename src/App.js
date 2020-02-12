import React, { Component } from 'react'

// fixBabelImports 通过这个简化组件导入
import {
  Button
} from 'antd'

const testHOC = (WrappedCompoenent) => {
  return class HOCComponent extends Component {
    render() {
      return (
        <>
          <WrappedCompoenent />
          <div>高阶组件包含的信息</div>
        </>
      )
    }
  }
}

@testHOC
class App extends Component {
  render() {
    return (
      <div>
        App
        <Button type='primary'>App</Button>
      </div>
    )
  }
}

export default App