import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { reducer as HeaderReducer } from '../components/Header/store'
import { reducer as homeReducer } from '../containers/Home/store'
import { reducer as TranslationReducer } from '../containers/Translation/store'
import clientAxios from '../client/request'
import serverAxios from '../server/request'

const reducer = combineReducers({
  home: homeReducer,
  header: HeaderReducer,
  translation: TranslationReducer,
})

export const getStore = req => createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios(req))))
export const getClientStore = () => {
  const defaultStore = window.context.state
  return createStore(reducer, defaultStore, applyMiddleware(thunk.withExtraArgument(clientAxios)))
}


