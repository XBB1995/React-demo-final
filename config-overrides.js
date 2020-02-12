/*
 * @file config-overrides.js
 * 给予customize-cra和react-app-rewired的定制化配置文件
*/

// 从customize-cra中导入部分方法
const {
  override,
  // less 处理器
  addLessLoader,
  // 简化 antd 组件导入
  fixBabelImports,
  // 高阶组件的使用
  addDecoratorsLegacy
} = require('customize-cra')

const modifyVars = require('./lessVars')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars
  }),
  addDecoratorsLegacy()
)