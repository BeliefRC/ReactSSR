import axios from 'axios'

const instance=axios.create({
  baseURL:'http://yapi.demo.qunar.com/mock/63165/ssr'
})
export default instance