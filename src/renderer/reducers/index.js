import { combineReducers }                                from 'redux'
import { routerReducer }                                  from 'react-router-redux'
import { credentialsReducer, loginResultReducer }         from './accounts'
import { offlineReducer }                                 from './network'
import { dbConnectReducer }                               from './db'

export default combineReducers({
  credentials: credentialsReducer,
  loginResult: loginResultReducer,
  offline: offlineReducer,
  db: dbConnectReducer,
  routing: routerReducer
})
