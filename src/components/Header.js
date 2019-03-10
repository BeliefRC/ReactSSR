import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

export default class Header extends Component {
  render () {
    return <header>
      <Link to='/'>Home</Link>
      <br/>
      <Link to='/login'>Login</Link>
      <hr/>
    </header>
  }
}
//31：53
