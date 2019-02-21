import axios from 'axios'
import {CHANGE_List} from './constants'

const changeList = (list) => ({
  type: CHANGE_List,
  list
})
export const getHomeList = () => {
  return dispatch => {
    axios.get('https://www.easy-mock.com/mock/5c6eba8f02694c5c754f57f9/ssr/api/news.json')
      .then(res => {
        const list = res.data.data
        dispatch(changeList(list))
      })
  }
}
