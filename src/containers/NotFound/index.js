import React, { Component, Fragment } from 'react'

export default class NotFound extends Component {
  componentWillMount () {
    if (this.props.staticContext) {
      this.props.staticContext.notFound = true
    }
  }

  render () {

    return <Fragment>
      NotFound 404
    </Fragment>
  }
}