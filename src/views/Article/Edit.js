import React, { Component, createRef } from 'react'

import {
  Card,
  Button,
  Form,
  Input,
  DatePicker,
  Spin,
  message
} from 'antd'

import { getArticleById, saveArticle } from '../../requests'

import E from 'wangeditor'
import './edit.less'

import moment from 'moment'

// 表单布局对象
const FormItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 16
  }
}

// 高阶组件
@Form.create({ name: 'normal_login' })
class Edit extends Component {
  constructor() {
    super()
    this.state = {
      // titleValidateStatus: '',
      // titleHelp: ''
      isLoading: false
    }
    this.editorRef = createRef()
  }
  // 提交表单的方法
  handleSubmit = e => {
    // 阻止默认行为
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        // 上传修改内容
        const data = Object.assign({}, values, {
          createAt: moment().valueOf()
        })
        this.setState({
          isLoading: true
        })
        // 在这里可以处理更多想要处理的逻辑
        saveArticle(this.props.match.params.id, data)
          .then(resp => {
            message.success(resp.msg)
            // 如果保存完需要跳转List
            this.props.history.push('/admin/article')
          })
          .finally(() => {
            this.setState({
              isLoading: false
            })
          })
      }
    })
  }
  // 富文本编辑器 加粗
  // BoldStyle = () => {
  //   // 更多功能可在 MDN 上查找
  //   document.execCommand("Bold")
  // }

  initEditor = () => {
    // current 才是真正的 dom
    this.editor = new E(this.editorRef.current)
    this.editor.customConfig.onchange = (html) => {
      // html 就是编辑器中输入的内容
      // form 中包含的组件已经自动做了如下操作
      // 因此使用第三方方法时 需要手动传值
      this.props.form.setFieldsValue({
        content: html
      })
    }
    // 自定义菜单内容
    // this.editor.customConfig.menus = [
    //   'head',
    //   'bold',
    //   'italic',
    //   'underline'
    // ]
    this.editor.create()
  }

  componentDidMount() {
    this.initEditor()
    this.setState({
      isLoading: true
    })
    getArticleById(this.props.match.params.id)
      .then(resp => {
        const { id, ...data } = resp
        data.createAt = moment(resp.createAt)
        this.props.form.setFieldsValue(data)
        // editor 显示
        this.editor.txt.html(data.content)
      })
      .finally(() => {
        this.setState({
          isLoading: false
        })
      })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Card
        title="文章"
        bordered={false}
        extra={<Button onClick={this.props.history.goBack}>取消编辑</Button>}
      >
        <Spin spinning={this.state.isLoading}>
          <Form
            onSubmit={this.handleSubmit}
            autoComplete="off"
            {...FormItemLayout}
          >
            <Form.Item
              // validateStatus={this.state.titleValidateStatus}
              // help={this.state.titleHelp}
              label="标题"
            >
              {getFieldDecorator('title', {
                // 定制规则
                rules: [
                  {
                    // 对应 label 前面的*号
                    required: true,
                    message: '标题是必填的！'
                  },
                  // 限制输入长度
                  // {
                  //   max: 8,
                  //   message: '不能超出8位!'
                  // }
                  // {
                  //   // 自定义校验 结合 state 进行
                  //   validator: (rule, value, callback) => {
                  //     if (value !== 'XBB') {
                  //       this.setState({
                  //         titleValidateStatus: 'error',
                  //         titleHelp: '请输入正确的用户名!'
                  //       })
                  //     } else {
                  //       this.setState({
                  //         titleValidateStatus: '',
                  //         titleHelp: ''
                  //       })
                  //     }
                  //     callback()
                  //   }
                  // }
                ],
              })(
                <Input
                  // a 是不透明度
                  // prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="文章标题"
                />,
              )}
            </Form.Item>
            <Form.Item
              label="作者"
            >
              {getFieldDecorator("author", {
                rules: [
                  {
                    // 对应 label 前面的*号
                    required: true,
                    message: '作者是必填的！'
                  }
                ],
              })(
                <Input placeholder="文章作者">
                </Input>
              )
              }
            </Form.Item>
            <Form.Item
              label="阅读量"
            >
              {getFieldDecorator("amount", {
                rules: [
                  {
                    // 对应 label 前面的*号
                    required: true,
                    message: '阅读量是必填的！'
                  }
                ],
              })(
                <Input placeholder="文章阅读量">
                </Input>
              )
              }
            </Form.Item>
            <Form.Item
              label="发布时间"
            >
              {getFieldDecorator("createAt", {
                rules: [
                  {
                    // 对应 label 前面的*号
                    required: true,
                    message: '发布时间是必填的！'
                  }
                ],
              })(
                <DatePicker showTime placeholder="选择文章发布时间" />
              )
              }
            </Form.Item>
            <Form.Item
              label="内容"
            >
              {getFieldDecorator("content", {
                rules: [
                  {
                    // 对应 label 前面的*号
                    required: true,
                    message: '内容是必填的！'
                  }
                ],
              })(
                // 富文本编辑器
                // 老方法是基于iframe进行开发 结合 designMode
                // 现在基本根据div 结合 contentEditable
                // 增加类型 修改层叠等级
                <div className="mi-editor" ref={this.editorRef} />
              )
              }
            </Form.Item>
            {/* htmlType 避免与Button的type属性冲突 */}
            <Form.Item wrapperCol={{ offset: 4 }}>
              <Button type="primary" htmlType="submit" className="login-form-button">
                保存修改
          </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Card>
    )
  }
}

export default Edit