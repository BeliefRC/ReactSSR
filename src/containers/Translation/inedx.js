import React, { Component, Fragment } from 'react'
import {Helmet} from "react-helmet";
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getTranslationList } from './store/actions'
import withStyle from '../../withStyle'
import styles from './style.css'

const mapDispatchToProps = dispatch => ({
  getTranslationList () {
    dispatch(getTranslationList())
  }
})
@withStyle(styles)
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
      <div className={styles.test}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>这是ssr项目的翻译页面 - 翻译达人</title>
          <meta name='description' content='这是ssr项目的翻译页面 - 翻译达人'/>
        </Helmet>
        {this.getList()}
      </div>
      :
      <Redirect to={'/'}/>

  }
}