import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import { withRouter } from 'react-router-dom'

import './frame.less'
// 提供LOGO图片的路径
import logo from './LOGO.png'
const { Header, Content, Sider } = Layout

@withRouter
class Frame extends Component {
  onMenuClick = ({ key }) => {
    // console.log(this.props)
    this.props.history.push(key)
  }
  render() {
    return (
      <Layout style={{ minHeight: '100%' }}>
        <Header className="header mi-header" >
          <div className="mi-logo" >
            <img src={logo} alt="LOGO-ADMIN"></img>
          </div>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              // 数组 因为存在多选的可能
              // selectedKeys  区别于 defaultSelectedKeys
              selectedKeys={[this.props.location.pathname]}
              style={{ height: '100%', borderRight: 0 }}
              onClick={this.onMenuClick}
            >
              {
                this.props.menus.map(item => {
                  return <Menu.Item key={item.pathname}>
                    <Icon type={item.icon}></Icon>
                    {item.title}
                  </Menu.Item>
                })
              }
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 16px 16px' }}>
            <Breadcrumb style={{ margin: '10px 10px' }}>
              {
                this.props.location.pathname.split('/').map(item => {
                  return <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
                })
              }
            </Breadcrumb>
            <Content
              style={{
                background: '#fff',
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default Frame