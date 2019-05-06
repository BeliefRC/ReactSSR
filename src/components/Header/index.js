import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { actions } from './store'
import withStyle from '../../withStyle'
import styles from './style.css'

@withStyle(styles)
@connect(
  state => ({
    login: state.header.login
  }),
  dispatch => ({
    handleLogin () {
      dispatch(actions.login())
    },
    handleLogout () {
      dispatch(actions.logout())

    }
  })
)
export default class Header extends Component {

  render () {
    const {login, handleLogin, handleLogout} = this.props
    return <header className={styles.container}>
      <Link to='/' className={styles.item}>首页</Link>
      {login ? <Fragment>
        <Link to='/translation' className={styles.item}>翻译列表</Link>
        <div onClick={handleLogout} className={styles.item}>退出</div>
      </Fragment> : <div onClick={handleLogin} className={styles.item}>登录</div>}
      <hr/>
    </header>
  }
}
