// Combine other reducers to one file

import { combineReducers } from 'redux'
import dataReducer from './dataReducer'
import { routerReducer } from 'react-router-redux'

export default combineReducers({
  data: dataReducer,
  routing: routerReducer
})
