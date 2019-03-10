import express from 'express'
import { matchRoutes } from 'react-router-config'
import { render } from './utils'
import getStore from '../store'
import routes from '../Routers'

const app = express()
app.use(express.static('public'))
app.get('*', (req, res) => {
  const store = getStore()
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
