import React, { Component } from 'react'
import { Card, Button, Table, Tag } from 'antd'
// import moment from 'moment'
import dayjs from 'dayjs'
import XLSX from 'xlsx'

import { getArticles } from '../../requests'

const ButtonGroup = Button.Group

// 标题map
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
      total: 0,
      isLoading: false,
      offset: 0,
      limited: 10
    }
  }

  // 获取数据
  getData = () => {
    this.setState({
      isLoading: true
    })
    getArticles(this.state.offset, this.state.limited)
      .then(resp => {
        const columnsKeys = Object.keys(resp.list[0])
        this.setState({
          total: resp.total,
          dataSource: resp.list,
          columns: this.createColumns(columnsKeys)
        })
      })
      .catch(err => {
        // 处理错误
      })
      .finally(() => {
        this.setState({
          isLoading: false
        })
      })
  }

  // 创建列表
  createColumns = (columnsKeys) => {
    const columns = columnsKeys.map(item => {
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
      }
      if (item === 'createAt') {
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
    // console.log(columns)
    // 增加操作列
    columns.push({
      title: '操作',
      key: 'action',
      render: () => {
        return (
          <ButtonGroup>
            <Button size="small" type="primary">编辑</Button>
            <Button size="small" type="danger">删除</Button>
          </ButtonGroup>
        )
      }
    })
    return columns
  }

  // ajax 请求
  componentDidMount() {
    this.getData()
  }

  // 分页操作
  onPageChange = (page, pageSize) => {
    this.setState({
      offset: pageSize * (page - 1),
      limited: pageSize
    }, () => {
      this.getData()
    })
  }

  onShowSizeChange = (current, size) => {
    this.setState({
      offset: 0,
      limited: size
    }, () => {
      this.getData()
    })
  }

  // 导出Excel
  toExcel = () => {
    // 实际上是前端给后端发送ajax请求 后端返回一个下载地址
    // 此处仅为模拟实现 注意数据格式
    // Object.keys方法 注意是无序的 可是适当使用文字标量来代替
    const data = [Object.keys(this.state.dataSource[0]).map(item => titleDisplayMap[item])]
    for (let i = 0; i < this.state.dataSource.length; i++) {
      data.push(Object.values(this.state.dataSource[i]))
    }
    const ws = XLSX.utils.aoa_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS")
    XLSX.writeFile(wb, "articles.xlsx")
  }

  render() {
    return (
      <Card
        title="文章列表"
        bordered={false}
        extra={<Button onClick={this.toExcel}>导出excel</Button>}
      >
        <Table
          // 自动根据记录给出 key
          rowKey={record => record.id}
          dataSource={this.state.dataSource}
          loading={this.state.isLoading}
          columns={this.state.columns}
          pagination={{
            // 当前页数
            current: this.state.offset / this.state.limited + 1,
            // 数据总条数
            total: this.state.total,
            // 每页的数据条数
            hideOnSinglePage: true,
            showQuickJumper: true,
            showSizeChanger: true,
            onChange: this.onPageChange,
            onShowSizeChange: this.onShowSizeChange
          }}
        // loading={true}
        />
      </Card >
    )
  }
}
