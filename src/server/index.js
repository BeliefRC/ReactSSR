import express from 'express'
import proxy from 'express-http-proxy'
import { matchRoutes } from 'react-router-config'
import { render } from './utils'
import { getStore } from '../store'
import routes from '../Routers'

const app = express()
app.use(express.static('public'))
app.use('/api', proxy('http://localhost:8080', {
  proxyReqPathResolver: function (req) {
    return `/ssr/api${req.url}`
  }
}))
app.get('*', (req, res) => {
  const store = getStore(req)
  // 根据路由路径，在store中添加数据
  const matchedRoutes = matchRoutes(routes, req.path)
  const promises = []
  matchedRoutes.forEach(item => {
    if (item.route.loadData) {
      promises.push(item.route.loadData(store))
    }
  })
  Promise.all(promises)
    .then(() => {
  res.send(render(store, routes, req))
  })

})
const server = app.listen(3000, () => {
  console.log(`server start at port 3000`)
})
