import React, { Component } from 'react'

import {
  Card,
  Button,
  Form,
  Input,
  DatePicker
} from 'antd'

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
  // constructor() {
  //   super()
  //   this.state = {
  //     titleValidateStatus: '',
  //     titleHelp: ''
  //   }
  // }
  // 提交表单的方法
  handleSubmit = e => {
    // 阻止默认行为
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }
  // 富文本编辑器 加粗
  BoldStyle = () => {
    // 更多功能可在 MDN 上查找
    document.execCommand("Bold")
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Card
        title="文章"
        bordered={false}
        extra={<Button >取消编辑</Button>}
      >
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
            label="创建时间"
          >
            {getFieldDecorator("createAt", {
              rules: [
                {
                  // 对应 label 前面的*号
                  required: true,
                  message: '创建时间是必填的！'
                }
              ],
            })(
              <DatePicker showTime placeholder="选择文章创建时间" />
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
              <>
                <Button size="small" onClick={this.BoldStyle}>加粗</Button>
                <div contentEditable style={{ border: '1px solid #dedede', width: '500px', minHeight: '300px' }}>
                </div>
              </>
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
      </Card>
    )
  }
}

export default Edit