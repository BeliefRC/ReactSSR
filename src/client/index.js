import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Routers from '../Routers'
import getStore from '../store'

const App = () => <Provider store={getStore()}>
  <BrowserRouter>
    {Routers}
  </BrowserRouter>
</Provider>

ReactDom.hydrate(<App/>, document.getElementById('root'))


