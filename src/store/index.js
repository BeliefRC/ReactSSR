import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { reducer as homeReducer } from '../containers/Home/store'
import clientAxios from '../client/request'
import serverAxios from '../server/request'

const reducer = combineReducers({
  home: homeReducer
})

export const getStore = () => createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios)))
export const getClientStore = () => {
  const defaultStore = window.context.state
  return createStore(reducer, defaultStore, applyMiddleware(thunk.withExtraArgument(clientAxios)))
}


