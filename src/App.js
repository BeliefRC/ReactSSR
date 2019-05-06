import React, { Component, Fragment } from 'react'
import Header from './components/Header'
import { renderRoutes } from 'react-router-config'
import { actions } from './components/Header/store'

export default class App extends Component {
  static loadData = store => {
    return store.dispatch(actions.getHeaderInfo())
  }

  render () {
    const {staticContext} = this.props
    return <Fragment>
      <Header staticContext={staticContext}/>
      {renderRoutes(this.props.route.routes)}
    </Fragment>
  }
}
