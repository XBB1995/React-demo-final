import React, { Component } from 'react'
import { Card, Button, Table, Tag, Modal, Typography, message, Tooltip } from 'antd'

// import moment from 'moment'
import dayjs from 'dayjs'
import XLSX from 'xlsx'

import {
  getArticles,
  deleteArticleById as deleteArticle
} from '../../requests'

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
      limited: 10,
      showDeleteModal: false,
      deleteArticleTitle: '',
      deleteArticleId: null,
      deleteLoadingState: false
    }
  }

  // 定制 增加组件渲染状态检验的 setState 方法
  setData = (state) => {
    // 如果组件已经销毁 (componentWillUnmount) 则取消数据设置
    if (!this.updater.isMounted(this)) return
    this.setState(state)
  }

  // 获取数据
  getData = () => {
    this.setState({
      isLoading: true
    })
    getArticles(this.state.offset, this.state.limited)
      .then(resp => {
        const columnsKeys = Object.keys(resp.list[0])
        this.setData({
          total: resp.total,
          dataSource: resp.list,
          columns: this.createColumns(columnsKeys)
        })
      })
      .catch(err => {
        // 处理错误
      })
      .finally(() => {
        this.setData({
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
            return (
              <Tooltip title='文章热度标签' >
                <Tag color={amount > 700 ? "red" : "green"}>{record.amount}</Tag>
              </Tooltip>
            )
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
      render: (record) => {
        return (
          <ButtonGroup>
            <Button size="small" type="primary" onClick={this.toEdit.bind(this, record.id)}>编辑</Button>
            <Button
              size="small"
              type="danger"
              // bind 用于传递参数
              onClick={this.showDeleteConfirmModal.bind(this, record)}
            >删除</Button>
          </ButtonGroup>
        )
      }
    })
    return columns
  }

  // 跳转至编辑页面
  toEdit = (id) => {
    // 隐式传参 不推荐 页面间传递数据应尽可能最小化
    // this.props.history.push({
    //   pathname: `/admin/article/edit/${record.id}`,
    //   state: {
    //     title: record.title
    //   }
    // })
    this.props.history.push(`/admin/article/edit/${id}`)
  }

  // 弹出 确认删除弹窗 
  showDeleteConfirmModal = (record) => {
    // 函数式的模态窗 可定制内容相对较少
    // Modal.confirm({
    //   title: <Typography>确认删除 {record.title}?</Typography>,
    //   content: '此操作不可逆，请谨慎!',
    //   okText: '残忍删除',
    //   cancelText: '我再想想',
    //   onOk: () => {
    //     deleteArticle(record.id)
    //       .then(resp => {
    //         console.log(resp)
    //       })
    //   }
    // })
    this.setState({
      showDeleteModal: true,
      deleteArticleTitle: record.title,
      deleteArticleId: record.id
    })
  }

  // 隐藏 弹窗
  hideDeleteComfirmModal = () => {
    this.setState({
      showDeleteModal: false,
      deleteLoadingState: false,
      // deleteArticleTitle: ''
    })
  }

  // ajax 删除文章操作
  deleteArticleById = () => {
    this.setState({
      deleteLoadingState: true
    })
    deleteArticle(this.state.deleteArticleId)
      .then(resp => {
        // console.log(resp)
        message.success(resp.msg)
        // 删除后 是留在当前页还是返回首页
        // 如果需要返回首页 
        this.setState({
          offset: 0
        }, () => {
          this.getData()
        })
      })
      .finally(() => {
        this.hideDeleteComfirmModal()
      })
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
    // console.log(this.props)
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
        <Modal
          title='该操作不可逆，请确认！'
          visible={this.state.showDeleteModal}
          onCancel={this.hideDeleteComfirmModal}
          onOk={this.deleteArticleById}
          confirmLoading={this.state.deleteLoadingState}
          okText='残忍删除'
          cancelText='我再想想'
        >
          <Typography>确认删除文章《<span style={{ color: '#f55' }}>{this.state.deleteArticleTitle}</span>》?</Typography>
        </Modal>
      </Card >
    )
  }
}
