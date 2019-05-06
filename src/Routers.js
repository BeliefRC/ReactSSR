import React from 'react'
import App from './App'
import Home from './containers/Home'
import Login from './containers/Login'
import Translation from './containers/Translation/inedx'
import NotFound from './containers/NotFound'

console.log(Home.loadData)
export default [
  {
    path: '/',
    component: App,
    loadData: App.loadData,
    routes: [
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
      {
        path: '/translation',
        key: 'translation',
        component: Translation,
        exact: true,
        loadData: Translation.loadData
      },
      {
        component: NotFound
      }
    ]
  },
]
