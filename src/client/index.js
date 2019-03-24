import React, { Fragment } from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import {renderRoutes} from 'react-router-config'
import routes from '../Routers'
import {getClientStore} from '../store'

const store=getClientStore()
const App = () => <Provider store={store}>
  <BrowserRouter>
    <Fragment>
      {renderRoutes(routes)}
    </Fragment>
  </BrowserRouter>
</Provider>

ReactDom.hydrate(<App/>, document.getElementById('root'))


