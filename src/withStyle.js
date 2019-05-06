import React, { Component } from 'react'
import styles from './components/Header/style.css'

export default (styles) => (DecoratedComponent) => {
  class newComponent extends Component {
    componentWillMount () {
      if (this.props.staticContext) {
        this.props.staticContext.css.push(styles._getCss())
      }
    }

    render () {
      return <DecoratedComponent {...this.props} />
    }
  }
  // 拷贝静态方法
  console.log(Object.keys(DecoratedComponent))
  Object.keys(DecoratedComponent).map(key => {
    newComponent[key] = DecoratedComponent[key]
  })
  return newComponent
}