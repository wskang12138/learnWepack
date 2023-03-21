import React from 'react'
import { Switch, HashRouter as Router, Route, Redirect } from "react-router-dom"

function renderRoutes(routes, auth, extraProps = {}, switchProps = {}) {
  return routes ? (
    <Router>
      <Switch {...switchProps}>
        {routes.map((route, i) => (
          <Route
            key={route.key || i}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            render={props => {
              if (route.auths && !route.auths.includes(auth)) {
                // 进行拦截
              }
              return route.render ? (
                route.render({ ...props, ...extraProps, route: route })
              ) : (
                <route.component {...props} {...extraProps} route={route} />
              )
            }
            }
          />
        ))}
        <Redirect to="/404" />
      </Switch>
    </Router>
  ) : null
}
export default renderRoutes
