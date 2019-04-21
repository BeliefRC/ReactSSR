import { CHANGE_LOGIN } from './constants'

const changeLogin = (value) => ({
  type: CHANGE_LOGIN,
  value
})


export const login = () => {
  return (dispatch, getState, request) => {
    return request.get('/api/login')
      .then(res => {
        dispatch(changeLogin(true))
      })
  }
}
export const logout = () => {
  return (dispatch, getState, request) => {
    return request.get('/api/logout')
      .then(res => {
        dispatch(changeLogin(false))
      })
  }
}

export const getHeaderInfo = () => {
  return (dispatch, getState, request) => {
    return request.get('/api/isLogin')
      .then(res => {
        dispatch(changeLogin(res.data.data.login))
      })
  }
}
