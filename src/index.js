import React from 'react'
import { render } from 'react-dom'

import App from './App'
// 导入样式表文件
import './index.less'

render(
  <App />,
  document.querySelector('#root')
)