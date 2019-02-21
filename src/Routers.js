import React from 'react'
import { Route } from 'react-router-dom'
import Home from './containers/Home'
import Login from './containers/Login'
import Header from './components/Header'

export default (
  <React.Fragment>
    <Header/>
    <Route path='/' exact component={Home}/>
    <Route path='/login' exact component={Login}/>
  </React.Fragment>
)
