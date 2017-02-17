import React from 'react'
import { IndexRoute, Route, Link, IndexRedirect, Redirect } from 'react-router'

/* containers */
import App from './containers/App'
import HomePage from './containers/HomePage'
import LoginPage from './containers/Loginpage'

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="/" component={HomePage}/>
    {/* <Redirect from='*' to='/404'/> */}
  </Route>,
  <Route path="/login" component={LoginPage}/>
)

export default routes
