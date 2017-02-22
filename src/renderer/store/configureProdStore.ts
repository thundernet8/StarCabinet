import rootReducer                          from '../reducers'
import { applyMiddleware, createStore }     from 'redux'
import ReduxThunk                           from 'redux-thunk'

export default function configureStore (initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(
            ReduxThunk
        )
    )
}
