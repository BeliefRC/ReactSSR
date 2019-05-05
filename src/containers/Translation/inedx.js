import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getTranslationList } from './store/actions'

const mapDispatchToProps = dispatch => ({
  getTranslationList () {
    dispatch(getTranslationList())
  }
})
@connect((state) => ({
    list: state.translation.translationList,
    login: state.header.login
  }),
  mapDispatchToProps)
export default class Translation extends Component {
  static loadData = store => {
    return store.dispatch(getTranslationList())
  }

  componentDidMount () {
    if (!this.props.list.length) {
      this.props.getTranslationList()
    }
  }

  getList = () => {
    const {list} = this.props
    return list.map(item => <div key={item.id}>
      {item.title}
    </div>)
  }

  render () {
    return this.props.login ?
      <div>
        {this.getList()}
      </div>
      :
      <Redirect to={'/'}/>

  }
}