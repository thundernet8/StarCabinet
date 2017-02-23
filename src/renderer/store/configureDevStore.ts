import rootReducer                          from '../reducers'
import { applyMiddleware, createStore }     from 'redux'
import ReduxThunk                           from 'redux-thunk'
import createLogger                         from 'redux-logger'
import webpack                              from 'webpack'

// const logger = createLogger({
//   predicate: (getState, action) => action.type !== 'FETCHING'
// })

export default function configureStore (initialState) {
    let store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(
            ReduxThunk,
            // logger
        )
    )

    // Make reducers hot reloadable, see http://stackoverflow.com/questions/34243684/make-redux-reducers-and-other-non-components-hot-loadable
    if (webpack.module.hot) {
        webpack.module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers').default
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}
