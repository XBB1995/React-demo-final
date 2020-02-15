import React, { Component } from 'react'
import { Card, Button, Table, Tag } from 'antd'
// import moment from 'moment'
import dayjs from 'dayjs'

import { getArticles } from '../../requests'

const titleDisplayMap = {
  id: '编号',
  title: '标题',
  author: '作者',
  amount: '阅读量',
  createAt: '创建时间'
}

export default class ArticleList extends Component {
  constructor() {
    super()
    this.state = {
      dataSource: [],
      columns: [],
      total: 0
    }
  }

  getData = () => {
    getArticles()
      .then(resp => {
        const columns = Object.keys(resp.list[0]).map(item => {
          // 根据阅读量定制
          if (item === 'amount') {
            return {
              title: titleDisplayMap[item],
              key: item,
              // 使用render可返回一个组件 
              render: (text, record) => {
                // 从 record 中解构出 amount
                const { amount } = record
                // 根据阅读量大小 调整Tag颜色
                return <Tag color={amount > 700 ? "red" : "green"}>{record.amount}</Tag>
              }
            }
          } else if (item === 'createAt') {
            return {
              title: titleDisplayMap[item],
              key: item,
              render: (record) => {
                const { createAt } = record
                // HH 24小时制 hh 12小时制
                return dayjs(createAt).format('YYYY年MM月DD日 HH:mm:ss')
              }
            }
          }
          return {
            title: titleDisplayMap[item],
            dataIndex: item,
            key: item
          }
        })
        this.setState({
          total: resp.total,
          dataSource: resp.list,
          columns: columns
        })
      })
  }

  // ajax 请求
  componentDidMount() {
    this.getData()
  }
  render() {
    return (
      <Card
        title="文章列表"
        bordered={false}
        extra={<Button>导出excel</Button>}
      >
        <Table
          // 自动根据记录给出 key
          rowKey={record => record.id}
          dataSource={this.state.dataSource}
          columns={this.state.columns}
          pagination={{
            // 数据总条数
            total: this.state.total,
            // 每页的数据条数
            pageSize: 20,
            hideOnSinglePage: true
          }}
        // loading={true}
        />
      </Card >
    )
  }
}
