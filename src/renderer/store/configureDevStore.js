import rootReducer                          from '../reducers'
import { applyMiddleware, createStore }     from 'redux'
import ReduxThunk                           from 'redux-thunk'
import createLogger                         from 'redux-logger'

// const logger = createLogger({
//   predicate: (getState, action) => action.type !== 'FETCHING'
// })
const logger = createLogger()

export default function configureStore (initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(
            ReduxThunk,
            logger
        )
    )
}
