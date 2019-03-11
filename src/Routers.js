import React from 'react'
import Home from './containers/Home'
import Login from './containers/Login'

export default [
  {
    path: '/',
    key: 'home',
    component: Home,
    exact: true,
    loadData: Home.loadData
  },
  {
    path: '/login',
    key: 'login',
    component: Login,
    exact: true,
    // loadData: Login.loadData()
  },
]
