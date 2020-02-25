import React, { Component } from 'react'
import axios from 'axios'

import { connect } from 'react-redux'
import { changeAvatar } from '../../actions/user'

import {
  Upload,
  Card,
  Spin
} from 'antd'

import './profile.less'

const mapState = (state) => ({
  avatarURL: state.user.avatar
})

@connect(mapState, { changeAvatar })
class Profile extends Component {
  state = {
    isUploading: false,
    avatarURL: ''
  }

  handleUploadAvatar = ({ file }) => {
    this.setState({
      isUploading: true
    })
    // 项目中较为常见的上传图片的方式
    // 都是基于 FormData 
    const data = new FormData()
    data.append('Token', '619a74dda129b5d006bb27bd8879d6d0cd01b9a1:iL4VdMyGjEYo7u2aobsyw_UsxBE=:eyJkZWFkbGluZSI6MTU4MjYyMzQwOSwiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNzEwODAxIiwiYWlkIjoiMTY2NjA1OSIsImZyb20iOiJmaWxlIn0=')
    data.append('file', file)
    axios.post('http://up.imgapi.com/', data)
      .then(resp => {
        if (resp.status === 200) {
          this.setState({
            isUploading: false
          })
          this.props.changeAvatar(resp.data.linkurl)
        } else {
          // 错误处理
        }
      })
      .catch(err => {
        // 处理错误
      })
  }

  render() {
    return (
      <Card
        title="个人设置"
        bordered={false}
      >
        <Upload
          showUploadList={false}
          customRequest={this.handleUploadAvatar}
        >
          <Spin spinning={this.state.isUploading}>
            {
              this.props.avatarURL
                ?
                <img style={{ width: '80px', height: '80px' }} src={this.props.avatarURL} alt='头像'></img>
                :
                <span className='mi-upload'>点击上传</span>
            }
          </Spin>
        </Upload>
      </Card>
    )
  }
}

export default Profile