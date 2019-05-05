import axios from 'axios'
import  config from '../config'
const instance=axios.create({
  baseURL:'/',
  params:config
})
export default instance