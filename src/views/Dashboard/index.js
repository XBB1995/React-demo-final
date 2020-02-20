import React, { Component, createRef } from 'react'

import {
  Card,
  Row,
  Col
} from 'antd'

import echarts from 'echarts'
import {
  getArticleAmount
} from '../../requests'

import './dashboard.less'

// const coverViewColors = []

export default class Dashboard extends Component {
  constructor() {
    super()
    this.articleAmount = createRef()
  }

  initArticleChart = () => {
    this.articleChart = echarts.init(this.articleAmount.current)
    getArticleAmount()
      .then(resp => {
        // 指定图表的配置项和数据
        const option = {
          tooltip: {},
          legend: {
            data: ['文章阅读量']
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: resp.amount.map(item => item.month)
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            areaStyle: {},
            type: 'line',
            data: resp.amount.map(item => item.value)
          }]
        };

        // 使用刚指定的配置项和数据显示图表。
        this.articleChart.setOption(option);
      })
  }

  getRandomColor = () => {
    return '#' + Math.random().toString(16).slice(-6)
  }

  componentDidMount() {
    this.initArticleChart()
  }

  render() {
    return (
      <>
        <Card
          title="概览"
          bordered={false}
        >
          <Row gutter={16}>
            <Col className="gutter-row" span={6}>
              <div
                className="mi-gutter-box"
                style={{ backgroundColor: this.getRandomColor() }}
              >col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="mi-gutter-box" style={{
                backgroundColor: this.getRandomColor()
              }}
              >col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="mi-gutter-box" style={{
                backgroundColor: this.getRandomColor()
              }}
              >col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="mi-gutter-box" style={{
                backgroundColor: this.getRandomColor()
              }}
              >col-6</div>
            </Col>
          </Row>
        </Card>
        <Card
          title="最近阅读量"
          bordered={false}
        >
          <div ref={this.articleAmount} style={{ height: '400px' }} />
        </Card>
      </>
    )
  }
}
