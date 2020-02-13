// react-loadable 原理解析
import React, { Component } from 'react'

const Loadable = ({
  loader,
  // 重命名!!!
  loading: Loading
}) => {
  return class LoadableComponent extends Component {
    state = {
      LoadedComponent: null
    }
    componentDidMount() {
      // 等同于 import('./MyComponent')
      loader()
        .then((resp) => {
          // console.log(resp)
          this.setState({
            LoadedComponent: resp.default
          })
        }).catch((err) => {
          console.log(err)
        });
    }
    render() {
      const {
        LoadedComponent
      } = this.state
      return (
        LoadedComponent
          ?
          <LoadedComponent />
          :
          // 组件名必须是大写 需要在对象解构中重命名
          <Loading />
      )
    }
  }
}

export default Loadable