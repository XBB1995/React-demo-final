import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon, Dropdown, Avatar, Badge } from 'antd'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/user'

import { getNotificationList } from '../../actions/notifications'

import './frame.less'
// 提供LOGO图片的路径
import logo from './LOGO.png'
const { Header, Content, Sider, } = Layout

const mapState = state => {
  return {
    notificationsCount: state.notifications.list.filter(item => item.hasRead === false).length,
    avatar: state.user.avatar,
    displayName: state.user.displayName
  }
}

// @withRouter
@connect(mapState, { getNotificationList, logout })
class Frame extends Component {
  onMenuClick = ({ key }) => {
    // console.log(this.props)
    this.props.history.push(key)
  }

  onDropdownMenuClick = ({ key }) => {
    if (key === "/login") {
      this.props.logout()
    } else {
      this.props.history.push(key)
    }
  }

  componentDidMount() {
    this.props.getNotificationList()
  }

  render() {
    const selectedKeyArr = this.props.location.pathname.split('/')
    // 截取数组前三项的巧妙方法 修改长度
    selectedKeyArr.length = 3

    // 渲染下拉菜单方法
    const renderDropdownMenu = () => (
      <Menu onClick={this.onDropdownMenuClick}>
        <Menu.Item key="/admin/notifications">
          <Badge count={this.props.notificationsCount} offset={[30, 6]}>
            通知中心
            </Badge>
        </Menu.Item>
        <Menu.Item key="/admin/profile">
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
            <Dropdown overlay={renderDropdownMenu}>
              <div className="mi-dropdown">
                <Badge dot={Boolean(this.props.notificationsCount)} offset={[-2, 2]}>
                  <Avatar src={this.props.avatar} />
                </Badge>
                <span> 欢迎您! {this.props.displayName}</span>
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