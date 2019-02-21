import {CHANGE_List} from './constants'
const defaultState = {
  newsList: []
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_List:
      return {
        ...state,
        newsList: action.list
      }
    default:
      return state
  }
}
