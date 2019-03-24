import React, { Component, Fragment } from 'react'
import Header from './components/Header'
import {renderRoutes} from 'react-router-config'

export default class App extends Component {
  render () {
    return <Fragment>
      <Header/>
      {renderRoutes(this.props.route.routes)}
    </Fragment>
  }
}