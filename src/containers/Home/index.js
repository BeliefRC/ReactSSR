import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getHomeList } from './store/actions'

const mapDispatchToProps = dispatch => ({
  getHomeList () {
    dispatch(getHomeList())
  }
})
@connect((state) => ({
    list: state.home.newsList
  }),
  mapDispatchToProps)
export default class Home extends Component {
  // 服务端渲染时，把store里的数据加载好
  static loadData = (store) => {
    return store.dispatch(getHomeList())
  }

  componentDidMount () {
    if (!this.props.list.length) {
      this.props.getHomeList()
    }
  }

  getList = () => {
    const {list} = this.props
    return list.map(item => <div key={item.id}>
      {item.title}
    </div>)
  }

  render () {
    return <div>
      {this.getList()}
      <button onClick={() => {alert('click')}}>click</button>
    </div>
  }
}
