import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  Card,
  Button,
  List,
  Avatar,
  Badge,
  Spin
} from 'antd'

import {
  markNotificationAsReadById,
  markAllNotificationsAsRead
} from "../../actions/notifications"

// 把 state 挂载到 this.props 上
const mapState = state => {
  const {
    list = [],
    isLoading
  } = state.notifications
  return {
    list,
    isLoading
  }
}

@connect(mapState, { markNotificationAsReadById, markAllNotificationsAsRead })
class Notifications extends Component {
  render() {
    // console.log(this.props.isLoading)
    return (
      <Card
        title="通知中心"
        bordered={false}
        extra={
          <Button
            disabled={this.props.list.every(item => item.hasRead === true)}
            onClick={this.props.markAllNotificationsAsRead}
          >
            全部标记为已读
          </Button>
        }
      >
        <Spin spinning={this.props.isLoading}>
          <List
            itemLayout="horizontal"
            dataSource={this.props.list}
            renderItem={item => (
              <List.Item
                extra={
                  item.hasRead
                    ?
                    null
                    :
                    <Button onClick={this.props.markNotificationAsReadById.bind(this, item.id)}>标记为已读</Button>
                }
              >
                <List.Item.Meta
                  avatar={
                    <Badge dot={!item.hasRead}>
                      <Avatar shape="square" icon="user" />
                    </Badge>
                  }
                  title={<a href="https://ant.design">{item.title}</a>}
                  description={item.desc}
                />
              </List.Item>
            )}
          />
        </Spin>
      </Card >
    )
  }
}

export default Notifications