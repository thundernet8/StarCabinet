import { combineReducers }                                from 'redux'
import { routerReducer }                                  from 'react-router-redux'
import { credentialsReducer, loginResultReducer }         from './accounts'
import { offlineReducer }                                 from './network'

export default combineReducers({
  credentials: credentialsReducer,
  loginResult: loginResultReducer,
  offline: offlineReducer,
  routing: routerReducer
})
