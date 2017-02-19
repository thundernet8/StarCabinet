import React                                                from 'react'
import { IndexRoute, Route, Link, IndexRedirect, Redirect } from 'react-router'

/* containers */
import App from './containers/app'
import HomePage from './containers/homePage'
import LoginPage from './containers/loginpage'

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="/" component={HomePage}/>
    {/* <Redirect from='*' to='/404'/> */}
    <Route path="/login" component={LoginPage}/>
  </Route>
)

export default routes
