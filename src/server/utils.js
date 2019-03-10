import React, { Fragment } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import Header from '../components/Header'

export const render = (store, routes, req) => {

  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={{}}>
        <Fragment>
          <Header/>
          {routes.map(route => (
            <Route {...route} />
          ))}
        </Fragment>
      </StaticRouter>
    </Provider>
  )
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ssr</title>
</head>
<body>
    <div id="root">${content}</div>
    <script >
    window.context={
      state:${JSON.stringify(store.getState())}
    }
</script>
    <script src="index.js"></script>
</body>
</html>
`

}
