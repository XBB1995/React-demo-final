import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox, Card } from 'antd'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../actions/user'

import './login.less'

const mapState = state => ({
  isLogin: state.user.isLogin,
  isLoading: state.user.isLoading
})

@connect(mapState, { login })
@Form.create()
class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values)
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      this.props.isLogin
        ?
        <Redirect to="/admin" />
        :
        <Card
          title="ADMIN 登录"
          className="mi-login-wrapper"
        >
          <Form onSubmit={this.handleSubmit} className="login-form" autoComplete="off">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入用户名' }],
              })(
                <Input
                  disabled={this.props.isLoading}
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码' }],
              })(
                <Input
                  disabled={this.props.isLoading}
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>记住我</Checkbox>)}
              {/* eslint-disable-next-line */}
              <a className="login-form-forgot" href="">忘记密码</a>
              <Button loading={this.props.isLoading} type="primary" htmlType="submit" className="login-form-button">
                登录
          </Button> 或
          {/* eslint-disable-next-line */}
              <a href=""> 现在注册!</a>
            </Form.Item>
          </Form>
        </Card>
    )
  }
}

export default Login