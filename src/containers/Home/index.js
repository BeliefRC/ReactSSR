import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Header from '../../components/Header'

class Home extends Component {
  render () {
    return <div>
      <Header/>
      this is {this.props.name}
      <button onClick={() => {alert('click')}}>click</button>
    </div>
  }
}

export default connect((state) => ({name: state.name}), null)(Home)
