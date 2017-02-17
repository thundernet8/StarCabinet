import React from 'react'
import ReactDOM from 'react-dom'
import { Router, hashHistory, applyRouterMiddleware } from 'react-router'
import { Provider } from 'react-redux'
import { createStore, /* applyMiddleware, */ combineReducers } from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import createLogger from 'redux-logger'
// import useScroll from 'scroll-behavior'
import { useScroll } from 'react-router-scroll'
import routes from './routes'
// import * as reducers from './reducers'
import mainReducer from './reducers/mainReducer'
// import * as actions from './actions'
import normalizeStyles from './styles/global/normalize.css'
import globalStyles from './styles/global/global.scss'

// const logger = createLogger({
//   predicate: (getState, action) => action.type !== 'FETCHING'
// })

const reducer = combineReducers({
  /* ...reducers, */
  mainReducer,
  routing: routerReducer
})

const store = createStore(reducer/*, applyMiddleware(thunk, logger) */) // TODO async task
// const scrollHistory = useScroll(() => browserHistory)()
// Create an enhanced history that syncs navigation events with the store
// const history = syncHistoryWithStore(scrollHistory, store)
const history = syncHistoryWithStore(hashHistory, store) // use hashHistory instead browserHistory in case of react-router cannot match routes

// Make reducers hot reloadable, see http://stackoverflow.com/questions/34243684/make-redux-reducers-and-other-non-components-hot-loadable
if (module.hot) {
  module.hot.accept('./reducers/mainReducer', () => {
    const nextRootReducer = require('./reducers/mainReducer').default
    store.replaceReducer(nextRootReducer)
  })
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} render={applyRouterMiddleware(useScroll())} />
  </Provider>,
  document.getElementById('app')
)
