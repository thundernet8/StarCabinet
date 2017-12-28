import { applyMiddleware, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import createLogger from "redux-logger";
import rootReducer from "../reducers";

// const logger = createLogger({
//   predicate: (getState, action) => action.type !== 'FETCHING'
// })
const logger = createLogger({ collapsed: true });

export default function configureStore(initialState) {
    return createStore(rootReducer, initialState, applyMiddleware(ReduxThunk, logger));
}
