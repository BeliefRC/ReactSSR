import React, { Component, Fragment } from 'react'
import Index from './components/Header'
import { renderRoutes } from 'react-router-config'
import { actions } from './components/Header/store'

export default class App extends Component {
  static loadData = store => {
    return store.dispatch(actions.getHeaderInfo())
  }

  render () {
    return <Fragment>
      <Index/>
      {renderRoutes(this.props.route.routes)}
    </Fragment>
  }
}
