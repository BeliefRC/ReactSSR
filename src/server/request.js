import axios from 'axios'
import  config from '../config'

const instance = req => axios.create({
  baseURL: 'http://localhost:8080/ssr',
  headers: {
    cookie: req.get('cookie') || '',
    params:config
  }
})
export default instance