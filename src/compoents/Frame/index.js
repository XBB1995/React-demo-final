import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon, Dropdown, Avatar, Badge } from 'antd'
import { withRouter } from 'react-router-dom'

import './frame.less'
// 提供LOGO图片的路径
import logo from './LOGO.png'
const { Header, Content, Sider, } = Layout

// @withRouter
class Frame extends Component {
  onMenuClick = ({ key }) => {
    // console.log(this.props)
    this.props.history.push(key)
  }

  // onDropdownMenuClick = ({ key }) => {
  //   this.props.history.push(key)
  // }

  render() {
    const selectedKeyArr = this.props.location.pathname.split('/')
    // 截取数组前三项的巧妙方法 修改长度
    selectedKeyArr.length = 3

    // 下拉菜单
    const menu = (
      <Menu onClick={this.onMenuClick}>
        <Menu.Item key="/admin/notifications">
          通知中心
        </Menu.Item>
        <Menu.Item key="/admin/settings">
          个人设置
        </Menu.Item>
        <Menu.Item key="/login">
          退出登录
        </Menu.Item>
      </Menu>
    )

    return (
      <Layout style={{ minHeight: '100%' }}>
        <Header className="header mi-header" >
          <div className="mi-logo" >
            <img src={logo} alt="LOGO-ADMIN"></img>
          </div>
          <div>
            <Dropdown overlay={menu}>
              <div className="mi-dropdown">
                <Badge dot offset={[-2, 2]}>
                  <Avatar size="small" icon="user" />
                </Badge>
                <span> 欢迎您! 用户A </span>
                <Icon type="down" />
              </div>
            </Dropdown>
          </div>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              // 数组 因为存在多选的可能
              // selectedKeys  区别于 defaultSelectedKeys
              selectedKeys={[selectedKeyArr.join('/')]}
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
                margin: 0,
                padding: 10
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

export default withRouter(Frame)