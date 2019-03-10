import React, { Fragment } from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import Header from '../components/Header'
import routes from '../Routers'
import {getClientStore} from '../store'

const store=getClientStore()
const App = () => <Provider store={store}>
  <BrowserRouter>
    <Fragment>
      <Header/>
      {routes.map(route => (
        <Route {...route} />
      ))}
    </Fragment>
  </BrowserRouter>
</Provider>

ReactDom.hydrate(<App/>, document.getElementById('root'))


