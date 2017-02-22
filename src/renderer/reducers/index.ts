import { combineReducers }                                from 'redux'
import { routerReducer }                                  from 'react-router-redux'
import { credentialsReducer, loginResultReducer }         from './accounts'

export default combineReducers({
  credentials: credentialsReducer,
  loginResult: loginResultReducer,
  routing: routerReducer
})
