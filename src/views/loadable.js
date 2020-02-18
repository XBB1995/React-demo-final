// react-loadable 原理解析
import React, { Component } from 'react'

const Loadable = ({
  loader,
  // 解构对象 重命名!!! 
  // 原名: 现在名称
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
        }).catch(err => console.log(err));
    }
    render() {
      const {
        LoadedComponent
      } = this.state
      return (
        LoadedComponent
          ?
          // 注意props数据的传递 
          <LoadedComponent {...this.props} />
          :
          // 组件名必须是大写 需要在对象解构中重命名
          <Loading />
      )
    }
  };
}

export default Loadable