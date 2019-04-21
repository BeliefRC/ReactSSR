import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { actions } from './store'

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
    console.log(login)
    return <header>
      <Link to='/'>首页</Link>
      <br/>
      {login ? <Fragment>
        <Link to='/login'>翻译列表</Link>
        <br/>
        <div onClick={handleLogout}>退出</div>
      </Fragment> : <div onClick={handleLogin}>登录</div>}
      <hr/>
    </header>
  }
}
