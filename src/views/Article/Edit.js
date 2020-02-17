import React, { Component } from 'react'

import {
  Card,
  Button
} from 'antd'

export default class Edit extends Component {
  render() {
    return (
      <Card
        title="文章"
        bordered={false}
        extra={<Button >取消编辑</Button>}
      >
        表单区域
        </Card>
    )
  }
}
