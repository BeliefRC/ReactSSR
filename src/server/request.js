import axios from 'axios'

const instance = req => axios.create({
  baseURL: 'http://localhost:8080/ssr',
  headers: {
    cookie: req.get('cookie') || ''
  }
})
export default instance