import React                                                    from 'react'
import ReactDOM                                                 from 'react-dom'
import { Router, hashHistory, applyRouterMiddleware }           from 'react-router'
import { Provider }                                             from 'react-redux'
import { combineReducers }                                      from 'redux'
import { syncHistoryWithStore }                                 from 'react-router-redux'
// import useScroll                                             from 'scroll-behavior'
import { useScroll }                                            from 'react-router-scroll'
import configureStore                                           from './store/configureStore'
import routes                                                   from './routes'
import './styles/global/normalize.css'
import 'antd/dist/antd.css'
import './styles/global/global.scss'

let store = configureStore()

// const scrollHistory = useScroll(() => browserHistory)()
// Create an enhanced history that syncs navigation events with the store
// const history = syncHistoryWithStore(scrollHistory, store)

const history = syncHistoryWithStore(hashHistory, store) // use hashHistory instead browserHistory in case of react-router cannot match routes

// Make reducers hot reloadable, see http://stackoverflow.com/questions/34243684/make-redux-reducers-and-other-non-components-hot-loadable
if (module.hot) {
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers').default
    store.replaceReducer(nextRootReducer)
  })
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} render={applyRouterMiddleware(useScroll())} />
  </Provider>,
  document.getElementById('app')
)
